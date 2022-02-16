import { EMAILUtility } from './js/utility.js';
import { Configuration, EMAILConfiguration } from './js/configuration.js';
import {
    HTTP_SUCCESS_CODE, EMAILRENDER_API_GETENTRIESOFCONTENTTYPEASYNCPATH,
    EMAILRENDER_TEMPLATE_APIPATH, EMAILRENDER_API_TEMPLATEBLOCKBYENTRYIDASYNC, EMAILRENDER_APIPATH
} from './js/constant.js';
import { usercontext } from './js/usercontext.js';
import uuidv4 from "./bundles/@bundled-es-modules/uuid/v4.js";
import { ExternalPreviewPopup, backtoParentPage, scrollBarCustomizeforIframe } from "./external_preview_popup.js"
import translation from './js/translation.js';
var isSaved = false; var mergeTags;

$(document).ready(function () {
    modifyLoaderSection();
    document.getElementById('alert-modal').style.display = 'none';
    window.addEventListener("resize", () => {
        document.body.querySelector(".cls-left-side-bottom-loader").style.height = "";
    }, true
    );
    document.getElementById('codeEditor').addEventListener('click', () => {
        if (document.getElementById('codeEditor').classList.contains('cls-btn-pressed')) {
            document.getElementById('codeEditor').classList.remove('cls-btn-pressed');
        }
        else {
            document.getElementById('codeEditor').classList.add('cls-btn-pressed');
        }
    })
    let setTimeInterval = setInterval(() => {
        if (document.querySelector("#saveBtn") != null) {
            console.log(document.querySelector("#saveBtn"));
            //    clearInterval(setTimeInterval);
            document.querySelector("#saveBtn").addEventListener('click', function (data) {
                document.querySelector('.cls-alert-container').firstElementChild.remove();
                window.StripoApi.getTemplate(function (html, css) {
                    saveTemplateToContentStack(html)
                    isSaved = true;
                })
            });
        }
    }, 1000);
    createCustomTiles();
});
var EMAILInitialization = {

    /*
    * This method will initialize stripo plugin template.
    * It call the callback method - initplugin once the html and css template is initialized.
    * multi_line - saving template html in multi_line field(content type property)
    */
    loadTemplate: async function (callback) {
        let templateWithBlockContent = Configuration.EmailRenderApi.setEmailRenderApiasDefaul == true ?
            await getTemplateFromEntry() : await getTemplateFromContentStack();

        let content = Configuration.EmailRenderApi.setEmailRenderApiasDefaul == true ?
            templateWithBlockContent.fullHtmlContent : await loadcustomblockfromcontentstack(templateWithBlockContent.entry.full_html_content);

        if (content == "" || content === undefined) {
            const url = './components/blankstripostructure.html';
            request('GET', url, null, function (html) {
                request('GET', Configuration.Stripo.DefaultTemplate.css, null, function (css) {
                    callback({ html: html, css: css });
                });
            });
        }
        else {
            console.log('else')
            request('GET', Configuration.Stripo.DefaultTemplate.css, null, function (css) {
                callback({ html: content, css: css });
            });
        }

        this.convertTextAsPerLocale();
    },



    convertTextAsPerLocale: function () {
        var locale = usercontext.locale.split('-')[0];
        if (locale === 'es') {
            document.getElementById("codeEditor").firstElementChild.innerText = translation.es.codeeditor;
            document.getElementById("previewButton").firstElementChild.innerText = translation.es.preview;
            document.getElementById("saveButton").firstElementChild.innerText = translation.es.save;
        }
        else {
            document.getElementById("codeEditor").firstElementChild.innerText = translation.en.codeeditor;
            document.getElementById("previewButton").firstElementChild.innerText = translation.en.preview;
            document.getElementById("saveButton").firstElementChild.innerText = translation.en.save;
        }
    },

    /*
    * This method will initialize stripo plugin template.
    * The Auth plugin id and secret key can be read from config file but in future will shift that in api side.
    */
    initPlugin: async function (template) {
        const apiRequestData = {
            emailId: uuidv4()
        };
        const script = document.createElement('script');
        script.id = 'stripoScript';
        script.type = 'text/javascript';
        script.src = Configuration.Stripo.StripoSource;
        script.onload = async function () {
            window.Stripo.init({
                mergeTags: await EMAILConfiguration.loadMergeTags(),
                extensions: [
                    {
                        globalName: "CustomBlockExtension",
                        url: "https://tavisca-vvijayakumar.github.io/important_information_mainjs/importantInformationBlock1.extension.js"
                    }
                ],
                "blockConfiguration": {
                    "groups": Configuration.EmailRenderApi.setEmailRenderApiasDefaul == true ?
                        await loadAllContentBlockEntries() : await loadContentBlocksGroup(),
                    "enabled": !(usercontext.contentTypeId === usercontext.customblock.contenttypeuuid)
                },
                settingsId: 'stripoSettingsContainer',
                previewId: 'stripoPreviewContainer',
                codeEditorButtonId: 'codeEditor',
                locale: usercontext.locale.split('-')[0],
                html: template.html,
                css: template.css,
                ignoreClickOutsideSelectors: '#externalFileLibrary',
                apiRequestData: apiRequestData,
                onTemplateLoaded: function () {
                    renderedPart();
                },
                getAuthToken: function (callback) {
                    request('POST', Configuration.Stripo.StipoAuthUrl,
                        JSON.stringify({
                            pluginId: usercontext.pluginId,
                            secretKey: usercontext.secretKey
                        }),
                        function (data) {
                            callback(JSON.parse(data).token);
                        });
                }
            });
        };
        document.body.appendChild(script);
    }
};

var retrieveContentBlockContentFromHTML = function (html) {

    if (usercontext.contentTypeId === usercontext.customblock.contenttypeuuid) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        var contentBlockContent = doc.querySelector('td.esd-stripe');
        if (contentBlockContent === undefined) {
            var contentBlockElement = doc.querySelector('td.esd-structure');
            return contentBlockElement.innerHTML;
        }

        return contentBlockContent.innerHTML;
    }

    return html;

}

var request = function (method, url, data, callback) {
    EMAILUtility.createXMLHttpRequest(method, url, data, callback);
};

var loadContentBlocksGroup = async function () {
    var queryParameter = {
        // environment: usercontext.environment,
        locale: usercontext.locale,
        includefallback: usercontext.includefallback
    }

    var url = `${Configuration.ContentStack.baseUrl}` + 'content_types/' +
        `${usercontext.customblock.contenttypeuuid}` + '/entries?' + addQueryParametersToContentStackUrl(queryParameter);
    var headers = EMAILUtility.getContentStackRequestHeader();

    var response = await EMAILUtility.createFetchRequest(url, headers, "GET");

    if (response != undefined) {
        var contentBlockGroupList = [];

        response.entries.forEach(element => {
            var group = {
                "id": element.uid,
                "name": element.name === undefined ? element.title : element.name,
                "placeholder": element.placeholdertext,
                "contenttype": usercontext.customblock.contenttypeuuid,
                "locale": element.locale,
                "multilinecontent": element.multi_line
            }
            contentBlockGroupList.push(group);
        });

        return contentBlockGroupList;
    }

    return [];
}

async function loadAllContentBlockEntries() {
    var queryParameter = {
        contentTypeId: usercontext.customblock.contenttypeuuid,
        locale: usercontext.locale,
        clientId: usercontext.clientId
    }

    var url = `${Configuration.EmailRenderApi.baseUrl}` + `/` + EMAILRENDER_APIPATH + `/` +
        EMAILRENDER_API_GETENTRIESOFCONTENTTYPEASYNCPATH + `?` + addQueryParametersToContentStackUrl(queryParameter);

    var headers = EMAILUtility.getEmailRenderRequestHeader("GET");
    var response = await EMAILUtility.createFetchRequest(url, headers, "GET");

    if (response != undefined) {
        var contentBlockGroupList = [];

        response.forEach(element => {
            var group = {
                "id": element.uid,
                "name": element.name === undefined || element.name === "" ? element.title : element.name,
                "placeholder": element.placeholdertext,
                "contenttype": usercontext.customblock.contenttypeuuid,
                "locale": element.locale,
                "multilinecontent": element.multiline,
                "eventtype": element.contentType
            }

            contentBlockGroupList.push(group);
        });

        return contentBlockGroupList;
    }

    return [];
}

var addQueryParametersToContentStackUrl = function (queryParameter) {
    if (queryParameter === undefined) {
        return;
    }

    let query = ""
    for (let parameter in queryParameter)
        query += encodeURIComponent(parameter) + '='
            + encodeURIComponent(queryParameter[parameter]) + '&'
    return query.slice(0, -1)
}

/*
* This method will return html entry response to load plugin.
*/
async function getTemplateFromEntry() {

    var data = {
        ContentTypeId: usercontext.contentTypeId,
        EntryId: usercontext.entryId,
        ClientId: usercontext.clientId,
        Locale: usercontext.locale,
    };

    var url = `${Configuration.EmailRenderApi.baseUrl}` + `/` + `${EMAILRENDER_TEMPLATE_APIPATH}` + `/` +
        `${EMAILRENDER_API_TEMPLATEBLOCKBYENTRYIDASYNC}` + `?` + addQueryParametersToContentStackUrl(data);
    var headers = EMAILUtility.getEmailRenderRequestHeader("GET");

    return await EMAILUtility.createFetchRequest(url, headers, "GET", undefined);
}

async function getTemplateFromContentStack() {
    var queryParameter = {
        locale: usercontext.locale,
        version: usercontext.version

    }
    //  var url = `${Configuration.ContentStack.baseUrl}` + 'content_types/' + `${usercontext.contentTypeId}`
    //    + '/entries/' + `${usercontext.entryId}?` + addQueryParametersToContentStackUrl(queryParameter);
    var url = `${Configuration.ContentStack.baseUrl}` + 'content_types/' + `${usercontext.contentTypeId}`
        + '/entries/' + `${usercontext.entryId}?` + addQueryParametersToContentStackUrl(queryParameter);

    var headers = EMAILUtility.getContentStackRequestHeader();
    return await EMAILUtility.createFetchRequest(url, headers, "GET");
}

async function loadcustomblockfromcontentstack(content) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(content, "text/html");
    var customBlockNodeList = doc.querySelectorAll('custom-block');
    if (customBlockNodeList.length == 0) {
        // ExternalPreviewPopup.openPreviewPopup(content);
    }
    for (var i = 0; i < customBlockNodeList.length; i++) {
        var element = customBlockNodeList[i];
        var outerhtml = element.innerHTML;
        var entryUID = element.getAttribute('selectedblocktypeuid');
        var contenttypeUID = element.getAttribute('selectedcontenttype');

        var queryParameter = {
            //environment: usercontext.environment,
            locale: usercontext.locale,
            includefallback: usercontext.includefallback
        }

        var url = `${Configuration.ContentStack.baseUrl}` + 'content_types/' + contenttypeUID + '/entries/' + entryUID
            + '?' + addQueryParametersToContentStackUrl(queryParameter);
        var headers = EMAILUtility.getContentStackRequestHeader();

        var response = await EMAILUtility.createFetchRequest(url, headers, "GET");

        customBlockNodeList[i].innerHTML = response.entry.multi_line;
        //content = content.replace(outerhtml, response.entry.multi_line);
    }

    if (customBlockNodeList.length > 0) {
        content = doc.documentElement.innerHTML;
    }
    return content;
}

/*
* This method will save modified template to content stack
*/
async function saveTemplateToContentStack(htmltext) {

    var parser = new DOMParser();
    var doc = parser.parseFromString(htmltext, "text/html");
    var customBlockNodeList = doc.querySelectorAll('custom-block');

    for (var i = 0; i < customBlockNodeList.length; i++) {
        customBlockNodeList[i].innerHTML = "";
    }

    if (customBlockNodeList.length > 0) {
        htmltext = doc.documentElement.outerHTML;
    }
    var response = retrieveContentBlockContentFromHTML(htmltext);
    var saveurl = "";
    if (Configuration.EmailRenderApi.setEmailRenderApiasDefaul == false) {
        var data = {
            "entry": {
                "custom": "",
                "multi_line": response,
                "full_html_content": htmltext,
                "tags": [],
                //TODO Need to pass locale from stripo
                "locale": "en-us"
            }
        };

        saveurl = `${Configuration.ContentStack.baseUrl}` + 'content_types/' + `${usercontext.contentTypeId}` + '/entries/' + `${usercontext.entryId}` + '?version=' + `${usercontext.version}`;
    }
    else {
        //Save through tavisca API
        var queryParameter = {
            contentType: usercontext.contentTypeId,
            entryId: usercontext.entryId,
            version: usercontext.version
        }
        var response = retrieveContentBlockContentFromHTML(htmltext);
        var data = {
            "Locale": usercontext.locale,
            "MultiLine": response,
            "FullHtmlContent": htmltext
        };

        saveurl = `${Configuration.EmailRenderApi.baseUrl}` + `${Configuration.EmailRenderApi.templatecontroller}`
            + addQueryParametersToContentStackUrl(queryParameter);
    }
    var headers = EMAILUtility.getContentStackRequestHeader();

    var successCode = await EMAILUtility.createFetchRequest(saveurl, headers, "PUT", data);

    if (successCode !== HTTP_SUCCESS_CODE) {
        renderAlertHtml(true, 'danger', 'Not Saved', [{ 'label': 'ok', 'value': false, id: 'closeAlertModal', class: '', 'functionName': 'closeAlertModal()' }]);
        throw new Error("Some exception occured");
    }
    renderAlertHtml(true, 'success', 'Saved', [{ 'label': 'ok', 'value': true, id: 'closeAlertModal', class: '', 'functionName': 'closeAlertModal()' }]);
    //  alert("Template has been saved successfully");
}

var retrieveContentBlockContentFromHTML = function (html) {

    if (usercontext.contentTypeId === usercontext.customblock.contenttypeuuid) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        var contentBlockContent = doc.querySelector('td.esd-stripe');
        if (contentBlockContent === undefined) {
            var contentBlockElement = doc.querySelector('td.esd-structure');
            return contentBlockElement.innerHTML;
        }

        return contentBlockContent.innerHTML;
    }

    return html;


}
async function previewTemplate(html) {

    //window.StripoApi.compileEmail((error, html, ampHtml, ampErrors) => { console.log(html) })
    ExternalPreviewPopup.openPreviewPopup(html);
}

// document.querySelector("#saveButton").addEventListener('click', function (data) {
//     window.StripoApi.getTemplate(function (html, css) {
//         saveTemplateToContentStack(html)
//         isSaved = true;
//     })
// });

document.querySelector('#previewButton').addEventListener('click', function () {
    previewBtnTriggered();
    window.StripoApi.compileEmail(function (error, html) {
        previewTemplate(html);
    });
});

window.addEventListener("beforeunload", function (e) {
    if (!isSaved) {
        var dialogText = 'There are some unsaved changes , Do you want to leave the site';
        e.returnValue = dialogText;
        return dialogText;
    }
});
window.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 27) {
        backtoParentPage();
        // externalPreviewPopup.style.visibility = 'hidden';

    }
    // do something
});

/**
 * Desc : Create Custom tiles
 */
function createCustomTiles() {
    let customTileValues = ["Header & Footer", "Email Body", "Orders", "Payment Summary", "Cross-Sell", "Marketing Blocks"];
    let customTiles = "";
    for (let tileValue of customTileValues) {
        customTiles += `<div class="col-xs-6 col-sm-4 esdev-no-padding"> 
        <div class="cls-custom-tile-block thumbnail esdev-block esd-extension-dnd-structure ui-draggable ui-draggable-handle" >
            <p>
                <span class="es-icon-product cls-custom-title-block-icon"></span>
            </p>
            <span class="cls-custom-font-size-blocks">${tileValue}</span>
        </div>
    </div>`
    }
    let checkBlockTiles = setInterval(() => {
        if (document.querySelector(".esdev-blocks") != null && document.querySelector(".cls-custom-tile-block") == null) {
            document.querySelector(".esdev-blocks").insertAdjacentHTML('beforeend', customTiles);
            // clearInterval(checkBlockTiles);            
            for (let element of document.querySelectorAll('[esd-element-name="esd-extension-CustomBlocks"]')) {
                element.querySelector('.es-icon-product').setAttribute("style", "color:#5384de!important")
                element.setAttribute("style", "background-color: #e2e2e2!important;color: #000!important;");
                for (let secondaryElements of element.childNodes) {
                    if (secondaryElements.data) {
                        secondaryElements.data = secondaryElements.data.replace("-", " ").trim();
                    }
                }
            }
        }
        modifyLoaderSection();
    }, 500);
}

/**
 * Desc : Enabling the preview button loader and disable the preview button
 */
function previewBtnTriggered() {
    const previewBtnElement = document.getElementById('previewButton');
    const previewIconElement = document.getElementById('preview-icon');
    const btnLoaderElement = document.getElementById('btn-loader');
    previewBtnElement.classList.add("cls-loader-customize-padding-icon");
    previewIconElement.style.display = 'none';
    btnLoaderElement.style.display = 'block';
}

/**
 * Desc : modify the backgorund color for iframe (child window)
 * Either id selector or class selector are permitted to do the customization in this function
 * @param {*} selector - id or class 
 * @param {*} type_1  - string (whether the first selector is id or class )
 * @param {*} correspondingSelector - id or class 
 * @param {*} type_2 - string (whether the second selector is id or class )
 */
function customizeIframeBg(selector, type_1, correspondingSelector, type_2) {
    let deskTopIframe = type_1 == 'id' ? document.getElementById(selector).contentWindow.document : document.getElementsByClassName(selector)[0].contentWindow.document;
    let innerElementofIframe = type_2 == 'id' ? deskTopIframe.getElementById(correspondingSelector) : deskTopIframe.getElementsByClassName(correspondingSelector)[0];
    innerElementofIframe.style.backgroundColor = '#f8f9fd';
}

/**
 * Desc : Function executes once the template is completely rendered
 */
function renderedPart() {
    const loader = document.querySelector('#overlay');
    const renderHTML = document.querySelector('#rendered-html');
    loader.style.display = "none";
    renderHTML.style.display = "block";
    scrollBarCustomizeforIframe('stripo-preview-frame', 'class');
    customizeIframeBg('stripo-preview-frame', 'class', 'es-wrapper-color', 'class');
    setTimeout(() => {
        let maxHeight = window.innerHeight - (document.documentElement.scrollHeight - document.body.querySelector(".esdev-panel-content-wrapper").scrollHeight);
        document.body.querySelector(".esdev-panel-content-wrapper").style.maxHeight = `${maxHeight}px`;
    }, 500);
}
/**
 * Desc : Get the height of the specific element by comparing with view and original height of screen 
 */
function modifyLoaderSection() {
    if (document.body.querySelector(".cls-left-side-bottom-loader").style.height == "") {
        let height = window.innerHeight - (document.body.querySelector('.cls-externalSystemContainer').offsetHeight + document.body.querySelector('.cls-stripo-left-loader').offsetHeight);
        document.body.querySelector(".cls-left-side-bottom-loader").style.height = height > 0 ? `${height}px` : "";
    }
}
export { EMAILInitialization }
