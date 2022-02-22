import  variationTile from '../../data/variationsTileData.json'  assert { type: "json" };
import  templateParameterData from '../../data/templateVariationData.json'  assert { type: "json" };
import  language from '../../data/languageData.json'  assert { type: "json" };
let variationsTileData = variationTile.variationsTileData;
let templateVariationData = templateParameterData.templateVariationData;
let languageData =language.languageData;
let formData = {
    storeData:false,
    formValues :{ }   
}
/**
 * Desc : Render the Send Mail popup DOM Elements
 */
function renderSendMailPopup() {
    emptyAllChildElement('cls-mailing-section','class');
    let div = document.createElement('div');
    div.className = "modal-container";
    div.innerHTML = `
    <div class="modal-header-container">
        <div class="cls-modal-header-section">
            <button type="button" class="cls-left-icon-modal cls-icon-customize-btn cls-custom-padding-back-icon close tooltip" onclick="closeSendEmailPopup()">
                <span class="tooltiptext cls-tool-tip-left">Back to Editor</span>
                <img class="cls-back-icon-to-editor" src="./img/svg-icons/back-svg.svg" alt="back">
            </button>
            <div class="modal-title">
                <h4 class="cls-unset-margin"> Send Mail</h4>
                <span class="cls-sub-title-text">This simulates actual mails being sent</span>
            </div>            
            <button id="eseBtnforSendEmail" type="button" class="modal-close-button" onclick="closeSendEmailPopup();">
                <span>esc</span>
            </button>
        </div>
    </div>
    <div class="cls-mail-form-section">
        <form class="cls-mailing-form" name="mailing-form">
            <div class="cls-form-element-section">
                <label class="cls-form-label cls-d-inline-block" for="mail-input">
                    <span class="cls-form-parent-label cls-d-inline-block" >Send test to</span>
                </label>
                <span class="tooltip cls-custom-font-icon-size cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                    <em class="fa-regular fa-circle-question"></em>
                    <span class="tooltiptext  cls-tooltip-customwidth_300">
                        Enter email ID to which mail is to be sent for review
                        <span class="cls-d-block">
                            To enter multiple mail id's separate them by comma(,)
                        </span>
                    </span>
                </span>                                       
                <input class="cls-form-input-text" type="text" name="email-input" id="email-input" placeholder="For example: support@tavisca.com" autocomplete="off"/>
                <span id="send-form-email-input-required" class="cls-validation-error-message">Email is required</span>
                <span id="send-form-email-input-valid" class="cls-validation-error-message">Provide valid email</span>
            </div>
            <div class="cls-form-element-section">
                <label class="cls-form-label cls-d-inline-block" for="mail-subject-input">Subject</label>
                <span class="tooltip cls-custom-font-icon-size cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                    <em class="fa-regular fa-circle-question"></em>
                    <span class="tooltiptext cls-tooltip-customwidth_300">
                        Enter subject name, this subject is relevant only for test mails
                    </span>
                </span>
                <input type="text" class="cls-form-input-text" name="mail-subject-input" id="mail-subject-input" placeholder="Subject" autocomplete="off"/>
                <span id="send-form-mail-subject-input-required" class="cls-validation-error-message">Subject is Required</span>
            </div>
            <div class="cls-form-element-section">               
                <div class="cls-template-parameter-section">
                    <div class="cls-form-element-section cls-template-parameter-dropdown">
                        <label class="cls-form-label cls-d-inline-block" for="mail-client">Client</label>
                        <span class="tooltip cls-custom-font-icon-size cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                            <em class="fa-regular fa-circle-question"></em>
                            <span class="tooltiptext cls-tooltip-customwidth_100">
                            Client
                            </span>
                        </span>
                        <div class="cls-dropdown">
                            <span onclick="clickDropdown('client-parameter','client-parameter-field')"  id="client-parameter-field" class="cls-dropdown-field">Select</span>
                            <span class="cls-dropdown-downarrow-icon"><em class="fa-solid fa-caret-down"></em></span>
                            <div id="client-parameter" class="cls-dropdown-content">
                                ${templateParameterOptions('client-parameter-field','program-group-parameter','client','program-group-parameter-field','program-name','program-name-parameter','program-name-parameter-field')}
                            </div>
                        </div>
                        <span id="send-form-client-required" class="cls-validation-error-message">Client is required</span>
                    </div>
                    <div class="cls-form-element-section cls-template-parameter-dropdown cls-cursor-not-allowed">
                        <label class="cls-form-label cls-d-inline-block" for="mail-client">Program Group</label>
                        <span class="tooltip cls-custom-font-icon-size cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                            <em class="fa-regular fa-circle-question"></em>
                            <span class="tooltiptext cls-tooltip-customwidth_100">
                            Program group
                            </span>
                        </span>                       
                        <div class="cls-dropdown">
                            <span onclick="clickDropdown('program-group-parameter','program-group-parameter-field')" id="program-group-parameter-field" class="cls-dropdown-field cls-disabled">Select</span>
                            <span class="cls-dropdown-downarrow-icon"><em class="fa-solid fa-caret-down"></em></span>
                            <div id="program-group-parameter" class="cls-dropdown-content cls-height-min-height-unset">
                                ${templateParameterOptions('program-group-parameter-field','program-name-parameter','program-group','program-name-parameter-field','','','')}
                            </div>
                        </div>
                        <span id="send-form-program-group-required" class="cls-validation-error-message">Program Group is required</span>
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
                            <span onclick="clickDropdown('program-name-parameter','program-name-parameter-field')" id="program-name-parameter-field" class="cls-dropdown-field cls-disabled">Select</span>
                            <span class="cls-dropdown-downarrow-icon"><em class="fa-solid fa-caret-down"></em></span>
                            <div id="program-name-parameter" class="cls-dropdown-content cls-height-min-height-unset">
                                ${templateParameterOptions('program-name-parameter-field','','program-name','','','','')}
                            </div>
                        </div>
                        <span id="send-form-program-name-required" class="cls-validation-error-message">Program Group is required</span>
                    </div>
                    <div class="cls-form-element-section cls-template-parameter-dropdown">
                        <label class="cls-form-label cls-d-inline-block" for="mail-client">Language</label>
                        <span class="tooltip cls-custom-font-icon-size cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                            <em class="fa-regular fa-circle-question"></em>
                            <span class="tooltiptext cls-tooltip-customwidth_100">
                                Language
                            </span>
                        </span>                       
                        <div class="cls-dropdown">
                            <span onclick="clickDropdown('language-parameter','language-parameter-field')" id="language-parameter-field" class="cls-dropdown-field">choose language</span>
                            <span class="cls-dropdown-downarrow-icon"><em class="fa-solid fa-caret-down"></em></span>
                            <div id="language-parameter" class="cls-dropdown-content cls-height-min-height-unset">
                                ${templateParameterOptions('language-parameter-field','','language','','','','')}
                            </div>
                        </div>
                        <span id="send-form-language-required" class="cls-validation-error-message">Language is required</span>
                    </div>           
                </div>
            </div>
            <div class="cls-form-element-section cls-form-element-margin-bottom_40">         
                <label class="cls-form-label cls-d-inline-block" for="mail-dropdown-tiltes">Scenario</label>
                <span class="tooltip cls-custom-font-icon-size cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
                    <em class="fa-regular fa-circle-question"></em>
                    <span class="tooltiptext cls-tooltip-customwidth_200">
                        Select any one variation to send mail
                    </span>
                </span>
                <div class="cls-box-selection-grid-separation">
                    ${variationsTilesRender(variationsTileData)}
                </div>
                <span id="send-form-variations-required" class="cls-validation-error-message">Select Scenario</span>
            </div>
            <div class="cls-form-element-section">
                <button type="button" class="cls-send-mail-btn" onclick="triggerSendMail()">Send</button>
            </div>
        </form>                   
    </div>`;
    document.querySelector('.cls-mailing-section').appendChild(div);
}
/**
 * Desc : open the send mail popup
 */
function openSendEmailPopup() {
    renderSendMailPopup();
    document.querySelector('.cls-mailing-section').classList.remove('cls-mail-section-section-hide');
    document.body.style.overflow = 'hidden';
    if (!document.querySelector('.cls-mailing-section').classList.contains('cls-mail-section-section-show')) {
        document.querySelector('#btnemailsend').classList.add('cls-btn-pressed');
        document.querySelector('.cls-mailing-section').classList.add('cls-mail-section-section-show');
    }    
    if(formData.storeData){
        setFormValues();
    }else{
        clickTile(0);
    } 
    selectTemplateParameterOption('language-parameter-field','','language','',languageData[0].languageName,0,'','','','');
}
/**
 * Desc : Set the values to the form field
 */
function setFormValues(){
    for(let [key,value] of Object.entries(formData.formValues)){
        switch(key){
            case 'email-input':
                if(document.querySelector(`input[name=${key}]`) != null){
                    document.querySelector(`input[name=${key}]`).value = value;
                }
                break;
            case 'mail-subject-input':                
                if(document.querySelector(`input[name=${key}]`) != null){
                    document.querySelector(`input[name=${key}]`).value = value;
                }
                if(document.querySelector(`input[name=${key}-preview]`) != null){
                    document.querySelector(`input[name=${key}-preview]`).value = value;
                }
                break;
            case 'mail-subject-input-preview':
                if(document.querySelector(`input[name=${key.slice(0,key.lastIndexOf("-"))}-preview]`) != null){
                    document.querySelector(`input[name=${key.slice(0,key.lastIndexOf("-"))}-preview]`).value = value;
                }
                if(document.querySelector(`input[name=${key.slice(0,key.lastIndexOf("-"))}]`) != null){
                    document.querySelector(`input[name=${key.slice(0,key.lastIndexOf("-"))}]`).value = value;
                }             
                break;
            case 'client':
                document.getElementById(`${key}-parameter-field`) != null && (document.getElementById(`${key}-parameter-field`).innerText = value.filter((data)=> {return data.selected })[0].clientName);
                document.getElementById(`${key}-parameter-field-preview`) != null && (document.getElementById(`${key}-parameter-field-preview`).innerText = value.filter((data)=> {return data.selected })[0].clientName);
                break;
            case 'client-preview':
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`).innerText = value.filter((data)=> {return data.selected })[0].clientName);
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`).innerText = value.filter((data)=> {return data.selected })[0].clientName);
                break;
            case 'program-group':
                document.getElementById(`${key}-parameter-field`) != null && (document.getElementById(`${key}-parameter-field`).innerText = value.filter((data)=> {return data.selected })[0].programGroupName);
                document.getElementById(`${key}-parameter-field`) != null && (document.getElementById(`${key}-parameter-field`).parentElement.parentElement.classList.remove('cls-cursor-not-allowed'));
                document.getElementById(`${key}-parameter-field`) != null && (document.getElementById(`${key}-parameter-field`).classList.remove('cls-disabled'));
                document.getElementById(`${key}-parameter-field-preview`) != null && (document.getElementById(`${key}-parameter-field-preview`).innerText = value.filter((data)=> {return data.selected })[0].programGroupName);
                document.getElementById(`${key}-parameter-field-preview`) != null && (document.getElementById(`${key}-parameter-field-preview`).parentElement.parentElement.classList.remove('cls-cursor-not-allowed'));
                document.getElementById(`${key}-parameter-field-preview`) != null && (document.getElementById(`${key}-parameter-field-preview`).classList.remove('cls-disabled'));
                break;
            case 'program-group-preview':
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`).innerText = value.filter((data)=> {return data.selected })[0].programGroupName) ;
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`).parentElement.parentElement.classList.remove('cls-cursor-not-allowed'));
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`).classList.remove('cls-disabled'));
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`).innerText = value.filter((data)=> {return data.selected })[0].programGroupName) ;
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`).parentElement.parentElement.classList.remove('cls-cursor-not-allowed'));
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`).classList.remove('cls-disabled'));
               break;
            case 'language':
                document.getElementById(`${key}-parameter-field`) != null && (document.getElementById(`${key}-parameter-field`).innerText = value.filter((data)=> {return data.selected })[0].languageName);
                document.getElementById(`${key}-parameter-field-preview`) != null && (document.getElementById(`${key}-parameter-field-preview`).innerText = value.filter((data)=> {return data.selected })[0].languageName);
                break;
            case 'language-preview':
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`).innerText = value.filter((data)=> {return data.selected })[0].languageName);
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`).innerText = value.filter((data)=> {return data.selected })[0].languageName);
                break;
            case 'program-name':
                document.getElementById(`${key}-parameter-field`) != null && (document.getElementById(`${key}-parameter-field`).innerText = value.filter((data)=> {return data.selected })[0].programName);
                document.getElementById(`${key}-parameter-field`) != null && (document.getElementById(`${key}-parameter-field`).parentElement.parentElement.classList.remove('cls-cursor-not-allowed'));
                document.getElementById(`${key}-parameter-field`) != null && (document.getElementById(`${key}-parameter-field`).classList.remove('cls-disabled'));
                document.getElementById(`${key}-parameter-field-preview`) != null && (document.getElementById(`${key}-parameter-field-preview`).innerText = value.filter((data)=> {return data.selected })[0].programName);
                document.getElementById(`${key}-parameter-field-preview`) != null && (document.getElementById(`${key}-parameter-field-preview`).parentElement.parentElement.classList.remove('cls-cursor-not-allowed'));
                document.getElementById(`${key}-parameter-field-preview`) != null && (document.getElementById(`${key}-parameter-field-preview`).classList.remove('cls-disabled'));
            case 'program-name-preview':
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`).innerText = value.filter((data)=> {return data.selected })[0].programName) ;
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`).parentElement.parentElement.classList.remove('cls-cursor-not-allowed'));
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field-preview`).classList.remove('cls-disabled'));
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`).innerText = value.filter((data)=> {return data.selected })[0].programName) ;
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`).parentElement.parentElement.classList.remove('cls-cursor-not-allowed'));
                document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`) != null && (document.getElementById(`${key.slice(0,key.lastIndexOf("-"))}-parameter-field`).classList.remove('cls-disabled'));
                break;
            case 'variations':
            case 'variations-preview':
                clickTile(value.findIndex((data)=> data.selected == true));
                break;
            default:
                break;
        }   
    }
}
/**
 * Desc : close the send mail popup
 */
function closeSendEmailPopup() {
    document.querySelector('.cls-mailing-section').classList.remove('cls-mail-section-section-show');
    document.body.style.overflow = 'unset';
    document.querySelector('#btnemailsend').classList.remove('cls-btn-pressed');
    if (!document.querySelector('.cls-mailing-section').classList.contains('cls-mail-section-section-hide')) {
        document.querySelector('.cls-mailing-section').classList.add('cls-mail-section-section-hide');
    }
}
/**
 * Desc : close the send mail popup by clicking the esc
 */
$('#eseBtnforSendEmail').on('click', function () {
    closeSendEmailPopup();
});
/**
 * Desc : close the send mail popup by pressing the esc key
 */
window.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 27) {
        closeSendEmailPopup();
    }
});
/**
 * Desc : select the variation
 * @param {} index : denotes the index of variations tiles data
 */
function clickTile(index) {
    resetVariationsTileSelection();
    variationsTileData.forEach((data)=>{data.selected = false});
    variationsTileData[index].selected = true;
    emptyAllChildElement('cls-box-selection-grid-separation',"class");
    let elementHtml = document.querySelectorAll('.cls-box-selection-grid-separation');
    for(let element of elementHtml){
        element.innerHTML = variationsTilesRender(variationsTileData);   
    }  
}
/**
 * Desc : send mail functionality
 */
function triggerSendMail() {   
    let fields = ["email-input","mail-subject-input","client",'program-group','program-name','language','variations'];
    resetValidation(fields);
    if(validation(fields) > 0){
        return;
    }  
    organizeFormValue(fields);
    console.log(formData);
    renderAlertHtml(true, 'success', "Mail has been sent to mentioned mail ID", [{ label: "ok", value: true, id: 'closeAlertModal', class: '', functionName: "closeAlertModal();" }]);
    // renderAlertHtml(true,'danger',"An error occurred while sending mail",[{label:"ok",value:false,functionName:"closeAlertModal"},{label:"Resend",value:true,functionName:"triggerSendMail"}])
}
/**
 * Desc : validation for form fields
 */
function validation(fields){
    let inValidCount = 0;
    for(let field of fields){
        switch(field){
            case 'email-input':
                if(document.querySelector(`input[name=${field}]`).value == ""){
                    document.querySelector(`#send-form-${field}-required`).style.display = "block";   
                    inValidCount = inValidCount+1;                   
                }else if(!multipleEmailbyCommaValidation(field)){
                    document.querySelector(`#send-form-${field}-valid`).style.display = "block";   
                    inValidCount = inValidCount+1;
                }
                break;
            case 'mail-subject-input':
            case 'mail-subject-input-preview':
                if(document.querySelector(`input[name=${field}]`).value == ""){
                    document.querySelector(`#send-form-${field}-required`).style.display = "block";   
                    inValidCount = inValidCount+1;
                }
                break;
            case 'client':
            case 'client-preview':
                if(!isOneValid(templateVariationData)){
                    inValidCount = inValidCount+1;
                    document.getElementById(`send-form-${field}-required`).style.display = 'block';
                }
                break;
            case 'program-group':
            case 'program-group-preview':
                for(let clientData of templateVariationData){
                    if(clientData.selected){           
                        if(!isOneValid(clientData.programGroup)){
                            inValidCount = inValidCount+1;
                            document.getElementById(`send-form-${field}-required`).style.display = 'block';
                        }
                    }
                }
                break;
            case 'language':
            case 'language-preview':
                if(!isOneValid(languageData)){
                    inValidCount = inValidCount+1;
                    document.getElementById(`send-form-${field}-required`).style.display = 'block';
                }
                break;
            case 'program-name':
                case 'program-name-preview':
                    for(let clientData of templateVariationData){
                        if(clientData.selected){   
                            for(let programData of clientData.programGroup){
                                if(programData.selected){
                                    if(!isOneValid(programData.program)){
                                        inValidCount = inValidCount+1;
                                        document.getElementById(`send-form-${field}-required`).style.display = 'block';
                                    }
                                }
                            }        

                        }
                    }
                    break;
            case 'variations':
            case 'variations-preview':
                if(!isOneValid(variationsTileData)){
                    inValidCount = inValidCount+1;
                    document.getElementById(`send-form-${field}-required`).style.display = 'block';
                }
                break;
            default:
                break;
        }
    }
    return inValidCount;
}
/**
 * Desc : custom validation pattern for email
 */
function multipleEmailbyCommaValidation(inputName){
    let individualMail = document.querySelector(`input[name=${inputName}]`).value.split(",");
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let successCount = 0;
    individualMail.forEach((mail) => {
        if(regex.test(mail)){
            successCount = successCount+1;
        }
    });
    return true ? successCount == individualMail.length : false;
}
/**
 * Desc : check whether the options are selected or not
 */
function isOneValid(targetArray){
   return targetArray.some((data)=>data.selected == true)
}
/**
 * Desc : Reset the validation at initial execution of send mail function
 */
function resetValidation(fields){  
    for(let resetFields of fields){
        document.getElementById(`send-form-${resetFields}-required`).style.display = 'none';
        if(resetFields.includes("email")){
            document.querySelector(`#send-form-${resetFields}-valid`).style.display = "none";      
        } 
    }
}
/**
 * Desc : Once the form is valid , organizing the form values data
 */
function organizeFormValue(fields){
    formData.storeData = true;
    for(let formFields of fields){            
        switch(formFields){
            case 'email-input':
            case 'mail-subject-input':
            case 'mail-subject-input-preview':
                if(document.getElementById(formFields) != null){
                    Object.assign(formData.formValues,{
                        [formFields]:document.getElementById(formFields).value
                    })
                }
                break;
            case 'client':
            case 'client-preview':
                Object.assign(formData.formValues,{
                    [formFields]: templateVariationData
                });
                break;
            case 'program-group':
            case 'program-group-preview':
                for(let clientData of templateVariationData){
                    if(clientData.selected){ 
                        Object.assign(formData.formValues,{
                            [formFields]:clientData.programGroup
                        });
                    }
                }
                break;
            case 'program-name':
            case 'program-name-preview':
                for(let clientData of templateVariationData){
                    if(clientData.selected){ 
                        for(let programData of clientData.programGroup){
                            if(programData.selected){
                                Object.assign(formData.formValues,{
                                    [formFields]:programData.program
                                });
                            }                            
                        }                       
                    }
                }
                break;
            case 'language':
            case 'language-preview':
                Object.assign(formData.formValues,{
                    [formFields]:languageData
                });
                break;
            case 'variations':
            case 'variations-preview':
                Object.assign(formData.formValues,{
                    [formFields]:variationsTileData
                });
                break;
        }
    }
}
/**
 * Desc : Empty all the inner elements
 * @param {*} selector : name of the selector
 * @param {*} selectorType: id or class
 */
function emptyAllChildElement(selector,selectorType) {
    if(selector !=''){
        let selectorValue = selectorType == "class" ? "."+selector:"#"+selector;
        if(document.querySelector(selectorValue).hasChildNodes()){
            while(document.querySelector(selectorValue).firstChild) {
                document.querySelector(selectorValue).removeChild(document.querySelector(selectorValue).firstChild);
            }
        }  
    }  
}
/**
 * Desc : select the specific tile using the index of tile data
 * @param {} index : index of tile data
 */
function setSelectedTile(index) {
    let element = document.querySelector('.cls-box-selection-grid-separation').children[index];
    element.style.border = "1px solid rgb(173, 173, 173)";
    element.children[(element.children.length - 1)].style.display = "block";
    element.style.background = "rgb(234 234 234)";
    element.style.boxShadow = "inset 0 3px 5px rgb(0 0 0 / 13%)";
    for (let styleElement of element.children) {
        styleElement.style.fontWeight = "bold";
    }
}
/**
 * Desc : Render the variation tile HTML structure
 * @param {} variationsData : input data
 * @returns : rendered HTML
 */
function variationsTilesRender(variationsData){  
    let sectionTwo = '';
    let sectionTwoparentElement = '';
    let sectionTwoChildElement = '';
    let sectionTwolastElemnt = '';
    let selectedTileCss = "border:1px solid rgb(173, 173, 173);background:rgb(234 234 234);box-shadow:inset 0 3px 5px rgb(0 0 0 / 13%);"
    variationsData.forEach((variationElement,index)=>{
        sectionTwoparentElement = "";
      if(variationElement.status){
            sectionTwoparentElement = `
            <div class="cls-tile" onclick="clickTile(${index})" style="${variationElement.selected && selectedTileCss}">
                <div class="cls-tile-header">
                    <span>${variationElement.tileTitle}</span>
                </div>
            <div class="cls-tile-content">`;                  
            sectionTwoChildElement = '';
            sectionTwolastElemnt = '';
            for(let options of variationElement.options){
                if(options.status){
                    sectionTwoChildElement +=`
                    <span class="cls-tile-value" style=${variationElement.selected && "font-weight:bold"}>
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        ${options.label}
                    </span>`;
                }               
            }
            if(variationElement.selected){
                sectionTwolastElemnt = `
                    <div class="cls-tick-section">
                        <span>
                            <em class="fa-solid fa-check"></em>
                        </span>
                    </div>`;
            }  
            sectionTwo += sectionTwoparentElement+sectionTwoChildElement+"</div>"+sectionTwolastElemnt+"</div>";    
        }        
    });
    return sectionTwo;
}
/**
 * Desc : Remove the selection in variation tile data
 */
function resetVariationsTileSelection(){
    for (let childElement of document.querySelector('.cls-box-selection-grid-separation').children) {
        childElement.style.border = "1px solid #ddd";
        childElement.style.background = "#fff";
        childElement.style.boxShadow = "unset";
        for (let styleElement of childElement.children) {
            styleElement.style.fontWeight = "unset";
        }
    }
}
/**
 * Desc : Render the template parameter options
 * @param {*} fieldIdSelector : respective field
 * @param {*} dropDownIdSelector : target id of dropdown list
 * @param {*} Optiontype : field type
 * @param {*} targetField : target dependency field
 * @returns : rendered HTML
 */
function templateParameterOptions(firstLevelIdselector,targetNextElementDropdown,firstLevelOptionType,secondLevelField,secondLevelOptionType,secondlevelTargetElementDropdown,thirdLevelField){
    let div = '';    
    switch(firstLevelOptionType){
        case 'client':
            templateVariationData.forEach((options,index)=>{
                if(options.status){
                    div+= `<span onclick="selectTemplateParameterOption('${firstLevelIdselector}','${targetNextElementDropdown}','client','program-group','${options.clientName}',${index},'','${secondLevelField}','','${secondLevelOptionType}','${secondlevelTargetElementDropdown}','${thirdLevelField}')" >${options.clientName}</span>`;
                }
            });
            break;
        case 'program-group':
            templateVariationData.forEach((options,primaryIndex)=>{
                if(options.selected){
                    options.programGroup.forEach((secondaryOptions,secondaryIndex)=>{
                        if(secondaryOptions.status){
                            div+=`<span onclick="selectTemplateParameterOption('${firstLevelIdselector}','','program-group','','${secondaryOptions.programGroupName}',${primaryIndex},${secondaryIndex},'${secondLevelField}','','program-name','${targetNextElementDropdown}','${secondLevelField}')">${secondaryOptions.programGroupName}</span>`
                        }                    
                    });
                }
            });
            break;
        case 'language':
            languageData.forEach((language,index)=>{
                if(language.status){
                    div+=`<span onclick="selectTemplateParameterOption('${firstLevelIdselector}','','language','','${language.languageName}',${index},'','','','')">${language.languageName}</span>`
                }                   
            });  
            break;
        case 'program-name':
            templateVariationData.forEach((options,primaryIndex)=>{
                if(options.selected){
                    options.programGroup.forEach((secondaryOptions,secondaryIndex)=>{
                        if(secondaryOptions.selected){
                            secondaryOptions.program.forEach((thirdOptions,thirdIndex)=>{
                                if(thirdOptions.status){
                                    div+=`<span onclick="selectTemplateParameterOption('${firstLevelIdselector}','','program-name','','${secondaryOptions.programGroupName}',${primaryIndex},${secondaryIndex},'',${thirdIndex},'','','')">${thirdOptions.programName}</span>`
                                }
                            })                            
                        }                    
                    });
                }                 
            });  
            break;
        default:
            break;                            
    }
    return div;
}
/**
 * Desc : Select the options in template parameter values
 * @param {*} fieldIdSelector : respective field
 * @param {*} dropDownIdSelector : target id of dropdown list
 * @param {*} Optiontype : field type
 * @param {*} targetOptionType : target field type
 * @param {*} value : field value
 * @param {*} index :specific index of dropdown list
 * @param {*} secondaryIndex : secondary index of dependency dropdown list
 * @param {*} targetFieldId : target dependency field
 */
function selectTemplateParameterOption(fieldIdSelector,dropDownIdSelector,Optiontype,targetOptionType,value,index,secondaryIndex,targetFieldId,thirdIndex,thirdLevelOptionType,thirdlevelTargetElementDropdown,thirdLevelField){
    document.getElementById(fieldIdSelector).innerText = value;   
    switch(Optiontype){
        case 'client':
            document.getElementById(targetFieldId).innerText = 'Select';
            document.getElementById(targetFieldId).parentElement.parentElement.classList.remove('cls-cursor-not-allowed');
            document.getElementById(targetFieldId).classList.remove('cls-disabled');
            emptyAllChildElement(dropDownIdSelector,'id');
            templateVariationData.forEach((data)=>{data.selected = false});
            templateVariationData[index].selected =true;
            document.getElementById(dropDownIdSelector).innerHTML = templateParameterOptions(targetFieldId,thirdlevelTargetElementDropdown,targetOptionType,thirdLevelField,'','','');
            break;
        case 'program-group':
            document.getElementById(targetFieldId).innerText = 'Select';
            document.getElementById(targetFieldId).parentElement.parentElement.classList.remove('cls-cursor-not-allowed');
            document.getElementById(targetFieldId).classList.remove('cls-disabled');
            emptyAllChildElement(thirdlevelTargetElementDropdown,'id');
            templateVariationData[index].programGroup.forEach((data)=> data.selected = false);
            templateVariationData[index].programGroup[secondaryIndex].selected = true;
            document.getElementById(thirdlevelTargetElementDropdown).innerHTML = templateParameterOptions(thirdLevelField,'',thirdLevelOptionType,'','','','');
            break;
        case 'language':
            languageData.forEach((data)=>data.selected=false);
            languageData[index].selected = true;
            break;
        case 'program-name':
            templateVariationData[index].programGroup[secondaryIndex].program.forEach((data)=> data.selected = false);
            templateVariationData[index].programGroup[secondaryIndex].program[thirdIndex].selected = true;
            break;
        default:
            break;
    }
}
/**
 * Desc : Click the dropdown options
 * @param {*} idSelector : name of the selector
 */
function clickDropdown(idSelector,currentFiledId) {
    document.getElementById(currentFiledId).style.zIndex = "4";
    document.getElementById(idSelector).classList.toggle("show");
}
/**
 * Desc : while clicking anythere , this function executes and detect whether the 
 *        dropdown is opened , if opened it will close the dropdown
 * @param {*} event : on-click event
 */
window.onclick = function(event) {
    if (!event.target.matches('.cls-dropdown-field')) {
        for(let element of document.querySelectorAll('.cls-dropdown-field')){
           element.style.zIndex = "2";
        }        
      var dropdowns = document.getElementsByClassName("cls-dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');          
        }
      }
    }
}
/**
 * Desc : Go to next page functionality in preview page popup 
 * @returns : stop the function execution,because forms field is invalid
 */
function goToNextPage(){
    let fields= ["mail-subject-input-preview","client-preview",'program-group-preview','program-name-preview','language-preview','variations-preview'];
    resetValidation(fields);
    if(validation(fields) > 0){
        return;
    }
    organizeFormValue(fields);
    document.querySelector('.cls-title-section').innerText = formData.formValues['mail-subject-input-preview'];
    if(document.querySelector('.preview-row').classList.contains('cls-preview-template-page-hide')){
        document.querySelector('.preview-row').classList.add('cls-preview-template-page-show');
        document.querySelector('.preview-row').classList.remove('cls-preview-template-page-hide');
        document.querySelector('.cls-preview-mail-form').classList.remove('cls-preview-mail-form-show');
        document.querySelector('.cls-preview-mail-form').classList.add('cls-preview-mail-form-hide');
    }
} 



export {
    openSendEmailPopup,
    selectTemplateParameterOption,
    setSelectedTile,
    triggerSendMail,
    clickDropdown,
    clickTile,
    closeSendEmailPopup,
    templateParameterOptions,
    variationsTilesRender,
    variationsTileData,
    templateVariationData,
    languageData,
    goToNextPage,
    formData,
    setFormValues
}
/**
 <div class="cls-dropdown-grid-separation">
        <div class="cls-form-element-section cls-dropdown-grid">
            <label class="cls-form-label" for="mail-dropdown-booked-products">Booked Products</label>
            <select class="cls-form-input-dropdown" id="mail-dropdown-booked-products"
                name="mail-dropdown-booked-products">
                <option>Flight Only</option>
                <option>Hotels Only</option>
                <option>Cars Only</option>
                <option>All Products</option>
            </select>
        </div>
        <div class="cls-form-element-section cls-dropdown-grid">
            <label class="cls-form-label" for="mail-dropdown-passengers">Passengers</label>
            <select class="cls-form-input-dropdown" id="mail-dropdown-passengers"
                name="mail-dropdown-passengers">
                <option>Single</option>
                <option>Multiple</option>
                <option>Multiple + infant</option>
                <option>All Products</option>
            </select>
        </div>
        <div class="cls-form-element-section cls-dropdown-grid">
            <label class="cls-form-label" for="mail-dropdown-hotel-type">Hotel type</label>
            <select class="cls-form-input-dropdown" id="mail-dropdown-hotel-type"
                name="mail-dropdown-hotel-type">
                <option>Single</option>
                <option>Multiple</option>
            </select>
        </div>
        <div class="cls-form-element-section cls-dropdown-grid">
            <label class="cls-form-label" for="mail-dropdown-resort-fee">Resort Fee</label>
            <select class="cls-form-input-dropdown" id="mail-dropdown-resort-fee"
                name="mail-dropdown-resort-fee">
                <option>Yes</option>
                <option>No</option>
            </select>
        </div>
        <div class="cls-form-element-section cls-dropdown-grid">
            <label class="cls-form-label" for="mail-dropdown-payment-options">Payment options</label>
            <select class="cls-form-input-dropdown" id="mail-dropdown-payment-options"
                name="mail-dropdown-payment-options">
                <option>Points</option>
                <option>Cash</option>
                <option>Points + Cash</option>
            </select>
        </div>
    </div> 


<div class="cls-form-element-section cls-d-flex-and-center">
    <input class="cls-form-input-checkbox" type="checkbox" id="mail-checkbox-default"
        name="mail-checkbox-default" />
    <label class="cls-form-checkbox-label" for="mail-checkbox-default">Default</label>
    <button type="button" class="cls-unset-deafult-btn-style tooltip">
        <span class="tooltiptext cls-tool-tip-left-mail-form cls-custom-tooltip-mail-form">Default values will be populated below</span>
        <img class="cls-icon-info-tooltip btn tooltip" src="./img/svg-icons/question.svg"/>
    </button>                            
</div>


<span id="prefined-value-show-btn" class="cls-mail-predefined-btn"
    onclick="clickTemplateParameters();">
    <img class="cls-arrow-icon-mail-form" src="./img/svg-icons/angle-right.svg" />
</span>
 <label class="cls-form-label cls-d-inline-block">                 
        <span>Template Parameters</span>
    </label>
    <span class="tooltip cls-custom-font-icon-size cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
        <em class="fa-regular fa-circle-question"></em>
        <span class="tooltiptext cls-tooltip-customwidth_200">
        These parameters are preselected based on template opened for editing
        </span>
    </span>
   <div class="cls-mail-prefined-valus" style="display:none;">
        <span class="cls-display-details">
            <span>Client ID</span>
            <span>52</span>
        </span>
        <span class="cls-display-details">
            <span>Client Name</span>
            <span>Default</span>
        </span>
        <span class="cls-display-details">
            <span>Program ID</span>
            <span>723</span>
        </span>
        <span class="cls-display-details">
            <span>Currency</span>
            <span>USD</span>
        </span>
        <span class="cls-display-details">
            <span>Language</span>
            <span>en-US</span>
        </span>
        <span class="cls-display-details">
            <span>Template type</span>
            <span>Order Confirmation</span>
        </span>
    </div>

    <div class="cls-form-element-section cls-template-parameter-dropdown cls-cursor-not-allowed">
        <label class="cls-form-label cls-d-inline-block">Email template</label>
        <span class="tooltip cls-custom-font-icon-size cls-custom-grey-color cls-d-inline-block cls-cursor-pointer">
            <em class="fa-regular fa-circle-question"></em>
            <span class="tooltiptext   cls-tooltip-customwidth_100">
                Email template
            </span>
        </span>
        <span class="cls-dropdown-field cls-disabled" id="email-template">${usercontext.TemplateName}</span>
    </div>

 function clickTemplateParameters() {
    if (document.querySelector('.cls-mail-prefined-valus').style.display == 'none') {
        document.querySelector('.cls-arrow-icon-mail-form').src = "./img/svg-icons/angle-down.svg";
        document.querySelector('.cls-mail-prefined-valus').style.display = 'block';
    } else {
        document.querySelector('.cls-arrow-icon-mail-form').src = "./img/svg-icons/angle-right.svg";
        document.querySelector('.cls-mail-prefined-valus').style.display = 'none';
    }
}



function removeTileSelection() {
    for (let childElement of document.querySelector('.cls-box-selection-grid-separation').children) {
        childElement.style.border = "1px solid #ddd";
        childElement.style.background = "#fff";
        childElement.style.boxShadow = "unset";
        childElement.children[(childElement.children.length - 1)].style.display = "none";
        for (let styleElement of childElement.children) {
            styleElement.style.fontWeight = "unset";
        }
    }
}
 */
