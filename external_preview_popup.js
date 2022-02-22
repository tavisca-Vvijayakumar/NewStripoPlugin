import { usercontext } from './js/usercontext.js';
import { templateParameterOptions,variationsTilesRender,variationsTileData,templateVariationData,languageData,goToNextPage,clickTile,selectTemplateParameterOption,formData ,setFormValues} from './js/mailing-section/mailing-section.js';
window.goToNextPage = goToNextPage;
window.clickTile = clickTile;
window.setFormValues = setFormValues;
window.selectTemplateParameterOption= selectTemplateParameterOption;
var externalPreviewPopup;
//window.ExternalPreviewPopup = (function() {
    var ExternalPreviewPopup ={
    
     close :function() {
        backtoParentPage();
    },

    initPreviewPopup : function() {
        var div = document.createElement('div');
        div.innerHTML = '\
            <div id="externalPreviewPopup">\
                <div class="modal-container">\
                    <div class="modal-header-container">\
                        <div class="cls-modal-header-section">\
                            <button id="previewback" type="button" class="cls-left-icon-modal cls-icon-customize-btn cls-custom-padding-back-icon close tooltip">\
                                <span class="tooltiptext cls-tool-tip-left">Back to Editor</span>\
                                <img src="./img/svg-icons/back-svg.svg" alt="back">\
                            </button>\
                            <h4 class="modal-title">'+usercontext.TemplateName+'</h4>\
                            <button id="eseBtn" type="button" class="close modal-close-button">\
                                <span>esc</span>\
                            </button>\
                        </div>\
                    </div>\
                    <div id="content"  class="preview-container-fluid">\
                       <div class="preview-row">\
                            <div class="preview-col-sm-8">\
                                <div class="esdev-desktop-device">\
                                    <div class="esdev-email-window-panel">\
                                        <img class="cls-user-image-popup" src="./img/svg-icons/user.svg" alt="user">\
                                        <span class="cls-dummy-title-section">\
                                            <span class="cls-dummy-title"></span>\
                                            <span class="cls-dummy-title cls-dummy-title-width-reduced"></span>\
                                        </span>\
                                        <!-- <div class="esdev-email-subject" style="min-height: 20px"></div>-->\
                                    </div>\
                                    <div class="esdev-desktop-device-screen">\
                                        <iframe id="iframeDesktop" frameborder="0" scrolling="yes"></iframe>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="preview-col-sm-4 esdev-no-padding-left">\
                                <div class="cls-mobile-device-responsive">\
                                    <div class="esdev-mobile-device center-block">\
                                        <span class="cls-mobile-top"></span>\
                                        <div class="esdev-mobile-device-screen">\
                                            <img src="mobile-view-top-bar.png" alt="">\
                                            <iframe id="iframeMobile" frameborder="0" width="100%" height="459" scrolling="yes"></iframe>\
                                            <img class="esdev-mail-bottom-bar" src="mobile-view-bottom-bar.png" alt="">\
                                            </div>\
                                        <span class="cls-mobile-bottom-btn"></span>\
                                    </div>\
                                </div>\
                            </div>\
                       </div>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);
        externalPreviewPopup = document.getElementById('externalPreviewPopup');
        externalPreviewPopup.querySelector('.close').addEventListener('click', this.close);
        $('#previewback').on('click', function(){
            backtoParentPage();
            // externalPreviewPopup.style.visibility = 'hidden';            
        });
        $('#eseBtn').on('click', function(){
            backtoParentPage();
            // externalPreviewPopup.style.visibility = 'hidden';            
        });
    },

     openPreviewPopup : function(html) {       
        if (!externalPreviewPopup) {
           this.initPreviewPopup();
        }
        this.updateContent(html);
        const modalPopUpElement = document.getElementById('externalPreviewPopup');
        modalPopUpElement.classList.add('cls-popup-show');
        document.body.style.overflow = 'hidden';      
        scrollBarCustomizeforIframe('iframeDesktop','id');
        scrollBarCustomizeforIframe('iframeMobile','id');
        if(!document.querySelector('.preview-row').classList.contains('cls-preview-template-page-hide')){
            document.querySelector('.preview-row').classList.remove('cls-preview-template-page-show');
            document.querySelector('.preview-row').classList.add('cls-preview-template-page-hide');
            document.querySelector('.cls-preview-mail-form').classList.remove('cls-preview-mail-form-show');
            document.querySelector('.cls-preview-mail-form').classList.remove('cls-preview-mail-form-hide');
        }
        if(formData.storeData){
            setFormValues();
        }else{
            clickTile(0);
        }
        selectTemplateParameterOption('language-parameter-field-preview','','language','',languageData[0].languageName,0,'','','','');
       // externalPreviewPopup.style.visibility = 'visible';
    },

     updateContent : function(html) {
        var iframeDesktop = document.querySelector('#iframeDesktop');
        iframeDesktop.contentWindow.document.open('text/html', 'replace');
        iframeDesktop.contentWindow.document.write(html);
        iframeDesktop.contentWindow.document.close();

        var iframeMobile = document.querySelector('#iframeMobile');
        iframeMobile.contentWindow.document.open('text/html', 'replace');
        iframeMobile.contentWindow.document.write(html);
        iframeMobile.contentWindow.document.close();
    },

    
    }
    /**
     * Desc : Back to parent page functionality
     * It will remove the class from popup window , disable the preview icon loader and enable the preview icon
     */    
     function backtoParentPage(){
        const previewBtnElement = document.getElementById('previewButton');
        const previewIconElement = document.getElementById('preview-icon');
        const btnLoaderElement = document.getElementById('btn-loader');   
        const modalPopUpElement = document.getElementById('externalPreviewPopup');
        modalPopUpElement.classList.remove('cls-popup-show');
        document.body.style.overflow = 'hidden';             
        previewBtnElement.classList.remove("cls-loader-customize-padding-icon");
        previewIconElement.style.display = 'unset';
        btnLoaderElement.style.display = 'none';
    }
    /**
     * Desc : Customize the Scroll bar for iframe (child window)
     */  
    function scrollBarCustomizeforIframe(selector,type){
        let deskTopIframe = type == 'id' ? document.getElementById(selector).contentWindow.document : document.getElementsByClassName(selector)[0].contentWindow.document;
        let styleSheet = deskTopIframe.createElement('style');
        deskTopIframe.head.appendChild(styleSheet);
        styleSheet.textContent = '::-webkit-scrollbar {width: 6px;} ::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 6px #f6f6f6; background-color:#f6f6f6 ;} ::-webkit-scrollbar-thumb{border-radius: 20px; background-color: #888888;}';
    }
   
    export{ExternalPreviewPopup ,backtoParentPage,scrollBarCustomizeforIframe}