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
        div.innerHTML = `
            <div id="externalPreviewPopup"> 
                <div class="modal-container"> 
                    <div class="modal-header-container"> 
                        <div class="cls-modal-header-section"> 
                            <button id="previewback" type="button" class="cls-left-icon-modal cls-icon-customize-btn cls-custom-padding-back-icon close tooltip"> 
                                <span class="tooltiptext cls-tool-tip-left">Back to Editor</span> 
                                <img src="./img/svg-icons/back-svg.svg" alt="back"> 
                            </button> 
                            <h4 class="modal-title">${usercontext.TemplateName} - Preview</h4> 
                            <button id="eseBtn" type="button" class="close modal-close-button"> 
                                <span>esc</span> 
                            </button> 
                        </div> 
                    </div> 
                    <div id="content"  class="preview-container-fluid"> 
                        <div class="cls-mail-form-section cls-preview-mail-form">
                            <form class="cls-mailing-form" name="mailing-form">
                                <div class="cls-form-element-section">
                                    <label class="cls-form-label cls-d-inline-block" for="mail-subject-input-preview">Subject</label>
                                    <span class="tooltip cls-custom-font-icon-size  cls-custom-font-icon-size cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                                        <em class="fa-regular fa-circle-question"></em>
                                        <span class="tooltiptext cls-tooltip-customwidth_300">
                                            Enter subject name, this subject is relevant only for test mails
                                        </span>
                                    </span>
                                    <input type="text" class="cls-form-input-text" name="mail-subject-input-preview" id="mail-subject-input-preview" placeholder="Subject" autocomplete="off"/>
                                    <span id="send-form-mail-subject-input-preview-required" class="cls-validation-error-message">Subject is Required</span>
                                </div>
                                <div class="cls-form-element-section">                                    
                                    <div class="cls-template-parameter-section">
                                        <div class="cls-form-element-section cls-template-parameter-dropdown">
                                            <label class="cls-form-label cls-d-inline-block" for="mail-client">Client</label>
                                            <span class="tooltip cls-custom-font-icon-size  cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                                                <em class="fa-regular fa-circle-question"></em>
                                                <span class="tooltiptext  cls-tooltip-customwidth_100">
                                                Client
                                                </span>
                                            </span>
                                            <div class="cls-dropdown">
                                                <span onclick="clickDropdown('client-parameter-preview','client-parameter-field-preview')"  id="client-parameter-field-preview" class="cls-dropdown-field">Select</span>
                                                <span class="cls-dropdown-downarrow-icon"><em class="fa-solid fa-caret-down"></em></span>
                                                <div id="client-parameter-preview" class="cls-dropdown-content">
                                                    ${templateParameterOptions('client-parameter-field-preview','program-group-parameter-preview','client','program-group-parameter-field-preview','program-name','program-name-parameter-preview','program-name-parameter-field-preview')}
                                                    </div>
                                            </div>
                                            <span id="send-form-client-preview-required" class="cls-validation-error-message">Client is required</span>
                                        </div>
                                        <div class="cls-form-element-section cls-template-parameter-dropdown cls-cursor-not-allowed">
                                            <label class="cls-form-label cls-d-inline-block" for="mail-client">Program Group</label>
                                            <span class="tooltip cls-custom-font-icon-size  cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                                                <em class="fa-regular fa-circle-question"></em>
                                                <span class="tooltiptext   cls-tooltip-customwidth_100">
                                                Program group
                                                </span>
                                            </span>  
                                            <div class="cls-dropdown">
                                                <span onclick="clickDropdown('program-group-parameter-preview','program-group-parameter-field-preview')" id="program-group-parameter-field-preview" class="cls-dropdown-field cls-disabled">Select</span>
                                                <span class="cls-dropdown-downarrow-icon"><em class="fa-solid fa-caret-down"></em></span>
                                                <div id="program-group-parameter-preview" class="cls-dropdown-content cls-height-min-height-unset">
                                                    ${templateParameterOptions('program-group-parameter-field-preview','program-name-parameter-preview','program-group','program-name-parameter-field-field','','','')}
                                                </div>
                                            </div>
                                            <span id="send-form-program-group-preview-required" class="cls-validation-error-message">Program Group is required</span>
                                        </div>
                                        <div class="cls-form-element-section cls-template-parameter-dropdown cls-cursor-not-allowed">
                                            <label class="cls-form-label cls-d-inline-block" for="program-name">Program Name</label>
                                            <span class="tooltip cls-custom-font-icon-size cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                                                <em class="fa-regular fa-circle-question"></em>
                                                <span class="tooltiptext cls-tooltip-customwidth_100">
                                                Program Name
                                                </span>
                                            </span>                       
                                            <div class="cls-dropdown">
                                                <span onclick="clickDropdown('program-name-parameter-preview','program-name-parameter-field-preview')" id="program-name-parameter-field-preview" class="cls-dropdown-field cls-disabled">Select</span>
                                                <span class="cls-dropdown-downarrow-icon"><em class="fa-solid fa-caret-down"></em></span>
                                                <div id="program-name-parameter-preview" class="cls-dropdown-content cls-height-min-height-unset">
                                                    ${templateParameterOptions('program-name-parameter-field-preview','','program-name','','','','')}
                                                </div>
                                            </div>
                                            <span id="send-form-program-name-preview-required" class="cls-validation-error-message">Program name is required</span>
                                        </div>
                                        <div class="cls-form-element-section cls-template-parameter-dropdown">
                                            <label class="cls-form-label cls-d-inline-block" for="mail-client">Language</label>
                                            <span class="tooltip cls-custom-font-icon-size cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                                                <em class="fa-regular fa-circle-question"></em>
                                                <span class="tooltiptext   cls-tooltip-customwidth_100">
                                                    Language
                                                </span>
                                            </span>
                                            <div class="cls-dropdown">
                                                <span onclick="clickDropdown('language-parameter-preview','language-parameter-field-preview')" id="language-parameter-field-preview" class="cls-dropdown-field">Select</span>
                                                <span class="cls-dropdown-downarrow-icon"><em class="fa-solid fa-caret-down"></em></span>
                                                <div id="language-parameter-preview" class="cls-dropdown-content cls-height-min-height-unset">
                                                    ${templateParameterOptions('language-parameter-field-preview','','language','','','','')}
                                                </div>
                                            </div>
                                            <span id="send-form-language-preview-required" class="cls-validation-error-message">Program Group is required</span>
                                        </div>                                        
                                    </div>
                                </div>
                                <div class="cls-form-element-section cls-form-element-margin-bottom_40">         
                                    <label class="cls-form-label cls-d-inline-block" for="mail-dropdown-tiltes">Scenario</label>
                                    <span class="tooltip cls-custom-font-icon-size  cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                                        <em class="fa-regular fa-circle-question"></em>
                                        <span class="tooltiptext  cls-tooltip-customwidth_200">
                                            Select any one variation to send mail
                                        </span>
                                    </span>
                                    <div class="cls-box-selection-grid-separation">
                                        ${variationsTilesRender(variationsTileData)}
                                    </div>
                                    <span id="send-form-variations-preview-required" class="cls-validation-error-message">Select Scenario</span>
                                </div>
                                <div class="cls-form-element-section">
                                    <button type="button" class="cls-send-mail-btn" onclick="goToNextPage()">Next
                                    <span class="cls-next-arrow-section">
                                        <em class="fa fa-arrow-right"></em>
                                    </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="preview-row cls-preview-template-page-hide"> 
                            <div class="preview-col-sm-8"> 
                                <div class="esdev-desktop-device"> 
                                    <div class="esdev-email-window-panel"> 
                                        <img class="cls-user-image-popup" src="./img/svg-icons/user.svg" alt="user"> 
                                        <span class="cls-title-section">
                                            ${formData.storeData ? formData.formValues["mail-subject-input"]:'Test'}
                                        </span> 
                                        <!-- <div class="esdev-email-subject" style="min-height: 20px"></div>--> 
                                    </div> 
                                    <div class="esdev-desktop-device-screen"> 
                                        <iframe id="iframeDesktop" frameborder="0" scrolling="yes"></iframe> 
                                    </div> 
                                </div> 
                            </div> 
                            <div class="preview-col-sm-4 esdev-no-padding-left"> 
                                <div class="cls-mobile-device-responsive"> 
                                    <div class="esdev-mobile-device center-block"> 
                                        <span class="cls-mobile-top"></span> 
                                        <div class="esdev-mobile-device-screen"> 
                                            <img src="mobile-view-top-bar.png" alt=""> 
                                            <iframe id="iframeMobile" frameborder="0" width="100%" height="459" scrolling="yes"></iframe> 
                                            <img class="esdev-mail-bottom-bar" src="mobile-view-bottom-bar.png" alt=""> 
                                            </div> 
                                        <span class="cls-mobile-bottom-btn"></span> 
                                    </div> 
                                </div> 
                            </div>
                        </div> 
                    </div> 
                </div> 
            </div>`;
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
