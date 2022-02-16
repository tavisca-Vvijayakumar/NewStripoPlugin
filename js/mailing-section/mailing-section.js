function openSendEmailPopup() {
    document.querySelector('.cls-mailing-section').classList.remove('cls-mail-section-section-hide');
    document.body.style.overflow = 'hidden';
    if (!document.querySelector('.cls-mailing-section').classList.contains('cls-mail-section-section-show')) {
        document.querySelector('#btnemailsend').classList.add('cls-btn-pressed');
        document.querySelector('.cls-mailing-section').classList.add('cls-mail-section-section-show');
    }
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