function renderSendMailPopup() {
    resetSendMailRenderStructure();
    let div = document.createElement('div');
    div.className = "modal-container";
    div.innerHTML = `<div class="modal-header-container">
    <div class="cls-modal-header-section">
        <button type="button" class="cls-left-icon-modal cls-icon-customize-btn cls-custom-padding-back-icon close tooltip" onclick="closeSendEmailPopup()">
            <span class="tooltiptext cls-tool-tip-left">Back to Editor</span>
            <img class="cls-back-icon-to-editor" src="./img/svg-icons/back-svg.svg" alt="back">
        </button>
        <h4 class="modal-title"> Send Mail</h4>
        <button id="eseBtnforSendEmail" type="button" class="modal-close-button" onclick="closeSendEmailPopup();">
            <span>esc</span>
        </button>
    </div>
</div>
<div class="cls-mail-form-section">
    <form class="cls-mailing-form" name="mailing-form">
        <div class="cls-form-element-section">
            <label class="cls-form-label cls-d-inline-block" for="mail-input">
                <span class="cls-form-parent-label cls-d-inline-block cls-v-align-middle" >Send test to</span>
                <!-- <span class="cls-form-sub-label">This simulates actual mails being sent</span> -->
            </label> 
            <button type="button" class="cls-unset-deafult-btn-style tooltip cls-d-inline-block cls-cursor-pointer cls-v-align-middle">
                <span class="tooltiptext cls-tool-tip-left-mail-form cls-custom-tooltip-mail-form">This simulates actual mails being sent</span>
                <img class="cls-icon-info-tooltip btn tooltip" src="./img/svg-icons/question.svg"/>
             </button>                          
            <input class="cls-form-input-text" type="text" name="mail-input" id="mail-input"
                placeholder="for example: support@tavisca.com" />
        </div>
        <div class="cls-form-element-section">
            <label class="cls-form-label" for="mail-subject-input">Subject</label>
            <input class="cls-form-input-text" type="text" name="mail-subject-input" id="mail-subject-input"
                placeholder="subject" />
        </div>
        <!-- <div class="cls-form-element-section cls-d-flex-and-center">
            <input class="cls-form-input-checkbox" type="checkbox" id="mail-checkbox-default"
                name="mail-checkbox-default" />
            <label class="cls-form-checkbox-label" for="mail-checkbox-default">Default</label>
            <button type="button" class="cls-unset-deafult-btn-style tooltip">
                <span class="tooltiptext cls-tool-tip-left-mail-form cls-custom-tooltip-mail-form">Default values will be populated below</span>
                <img class="cls-icon-info-tooltip btn tooltip" src="./img/svg-icons/question.svg"/>
             </button>                            
        </div> -->
        <label class="cls-form-label" for="mail-dropdown-tiltes">Variations</label>
        <div class="cls-box-selection-grid-separation">                            
            <div class="cls-tile" onclick="clickTile(this)">
                <div class="cls-tile-header">
                    <span>Option 1</span>
                </div>
                <div class="cls-tile-content">
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Flight Booking
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        CLP
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Multi Pax + Infant
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Mix and Match
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Points+Cash
                    </span>
                </div>                                
                <div class="cls-tick-section">
                    <img class="cls-tick-icon" src="./img/svg-icons/check.svg"/>
                </div>                               
            </div>
            <div class="cls-tile" onclick="clickTile(this)">
                <div class="cls-tile-header">
                    <span>Option 2</span>
                </div>
                <div class="cls-tile-content">
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Multiple hotels booked
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Resort Fee applicable
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Points+Cash
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Online,Registered Flow
                    </span>
                </div>
                <div class="cls-tick-section">
                    <img class="cls-tick-icon" src="./img/svg-icons/check.svg"/>
                </div>   
            </div>
            <div class="cls-tile" onclick="clickTile(this)">
                <div class="cls-tile-header">
                    <span>Option 3</span>
                </div>
                <div class="cls-tile-content">
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Cars Only
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Points + Cash
                    </span>
                </div>
                <div class="cls-tick-section">
                    <img class="cls-tick-icon" src="./img/svg-icons/check.svg"/>
                </div>   
            </div>
            <div class="cls-tile" onclick="clickTile(this)">
                <div class="cls-tile-header">
                    <span>Option 4</span>
                </div>
                <div class="cls-tile-content">
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        All Products booked
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        CLP
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Multipax + infant
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Round-trip
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Points + Cash
                    </span>
                </div>
                <div class="cls-tick-section">
                    <img class="cls-tick-icon" src="./img/svg-icons/check.svg"/>
                </div>   
            </div>
            <div class="cls-tile" onclick="clickTile(this)">
                <div class="cls-tile-header">
                    <span>Option 5</span>
                </div>
                <div class="cls-tile-content">
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Voluntary Exchange Flight Confirmation
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        CLP based
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Multi Pax + Infant
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        One-way
                    </span>
                    <span class="cls-tile-value">
                        <img class="cls-tile-option-tick" src="./img/svg-icons/check.svg"/>
                        Points + Cash
                    </span>
                </div>
                <div class="cls-tick-section">
                    <img class="cls-tick-icon" src="./img/svg-icons/check.svg"/>
                </div>   
            </div>
        </div>
        <!-- <div class="cls-dropdown-grid-separation">
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
        </div> -->
        <div class="cls-form-element-section cls-customize-margin-top_20">
            <label class="cls-form-label">
                <span id="prefined-value-show-btn" class="cls-mail-predefined-btn"
                    onclick="clickPredefined();">
                    <img class="cls-arrow-icon-mail-form" src="./img/svg-icons/angle-right.svg" />
                </span>
                <span>
                    Template Parameters
                </span>
            </label>
        </div>
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
        <button type="button" class="cls-send-mail-btn" onclick="triggerSendMail()">Send mail</button>
    </form>                   
    </div>`;
    document.querySelector('.cls-mailing-section').appendChild(div);
}
function openSendEmailPopup() {
    renderSendMailPopup();
    document.querySelector('.cls-mailing-section').classList.remove('cls-mail-section-section-hide');
    document.body.style.overflow = 'hidden';
    if (!document.querySelector('.cls-mailing-section').classList.contains('cls-mail-section-section-show')) {
        document.querySelector('#btnemailsend').classList.add('cls-btn-pressed');
        document.querySelector('.cls-mailing-section').classList.add('cls-mail-section-section-show');
    }
    setSelectedTile(0);
}

function clickPredefined() {
    if (document.querySelector('.cls-mail-prefined-valus').style.display == 'none') {
        document.querySelector('.cls-arrow-icon-mail-form').src = "./img/svg-icons/angle-down.svg";
        document.querySelector('.cls-mail-prefined-valus').style.display = 'block';
    } else {
        document.querySelector('.cls-arrow-icon-mail-form').src = "./img/svg-icons/angle-right.svg";
        document.querySelector('.cls-mail-prefined-valus').style.display = 'none';
    }
}

function closeSendEmailPopup() {
    document.querySelector('.cls-mailing-section').classList.remove('cls-mail-section-section-show');
    document.body.style.overflow = 'unset';
    document.querySelector('#btnemailsend').classList.remove('cls-btn-pressed');
    if (!document.querySelector('.cls-mailing-section').classList.contains('cls-mail-section-section-hide')) {
        document.querySelector('.cls-mailing-section').classList.add('cls-mail-section-section-hide');
    }
}

$('#eseBtnforSendEmail').on('click', function () {
    closeSendEmailPopup();
});
window.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 27) {
        closeSendEmailPopup();
    }
});
function clickTile(element) {
    for (let childElement of element.parentElement.children) {
        childElement.style.border = "1px solid #ddd";
        childElement.style.background = "#fff";
        childElement.style.boxShadow = "unset";
        childElement.children[(childElement.children.length - 1)].style.display = "none";
        for (let styleElement of childElement.children) {
            styleElement.style.fontWeight = "unset";
        }
    }
    element.style.border = "1px solid rgb(173, 173, 173)";
    element.children[(element.children.length - 1)].style.display = "block";
    element.style.background = "rgb(234 234 234)";
    element.style.boxShadow = "inset 0 3px 5px rgb(0 0 0 / 13%)";
    for (let styleElement of element.children) {
        styleElement.style.fontWeight = "bold";
    }
}

function triggerSendMail() {
    renderAlertHtml(true, 'success', "Mail has been sent to mentioned mail ID", [{ label: "ok", value: true, id: 'closeAlertModal', class: '', functionName: "closeAlertModal(); closeSendEmailPopup()" }]);
    // renderAlertHtml(true,'danger',"An error occurred while sending mail",[{label:"ok",value:false,functionName:"closeAlertModal"},{label:"Resend",value:true,functionName:"triggerSendMail"}])
}

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

function resetSendMailRenderStructure() {
    while (document.querySelector('.cls-mailing-section').firstChild) {
        document.querySelector('.cls-mailing-section').removeChild(document.querySelector('.cls-mailing-section').firstChild);
    }
}
