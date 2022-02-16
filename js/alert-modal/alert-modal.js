
function renderAlertHtml(condition, type, message, actionButtons) {
    closeAlertModal();
    let div = document.createElement('div');
    div.className = "cls-alert-container";
    if (condition) {
        switch (type) {
            case 'success':
                div.innerHTML = `
                    <div class="cls-alert-box">
                        <span class="cls-alert-close" onclick="closeAlertModal()">x</span>
                        <div class="cls-alert-icon cls-alert-icon-success">
                            <span class="cls-alert-success-line cls-alert-success-line-long"></span>
                            <span class="cls-alert-success-line cls-alert-success-line-tip"></span>                
                            <div class="cls-alert-success-ring "></div>
                            <div class="cls-alert-success-hide-corners"></div>
                        </div>    
                        <span class="cls-alert-success-message">${message}</span>             
                    </div>`
                break;
            case 'info':
                div.innerHTML = `
                        <div class="cls-info-box">
                            <span class="cls-alert-close" onclick="closeAlertModal()">x</span>
                            <div class="cls-alert-icon-section cls-alert-icon-info cls-alert-info-show" style="display: flex;">
                                <div class="cls-alert-info-content">i</div>
                            </div>  
                            <span> ${message}</span> 
                        </div>`
                break;
            case 'danger':
                div.innerHTML = `
                    <div class="cls-danger-alert-box">
                        <span class="cls-alert-close" onclick="closeAlertModal()">x</span>
                        <div class="cls-alert-icon-section cls-alert-icon-error cls-alert-info-show" style="display: flex;">
                            <span class="cls-alert-x-marks">
                                <span class="cls-alert-x-mark-line-left"></span>
                                <span class="cls-alert-x-mark-line-right"></span>
                            </span>
                        </div>
                        <span> ${message}</span> 
                    </div>`
                break;
            case 'warning':
                div.innerHTML = `
                    <div class="cls-warning-alert-box">
                        <span class="cls-alert-close" onclick="closeAlertModal()">x</span>
                        <div class="cls-alert-warn-icon cls-alert-warning cls-alert-pulse-warning" style="display: block;"> 
                            <span class="cls-alert-warn-body cls-alert-warn-Ins"></span> 
                            <span class="cls-alert-warn-dot cls-alert-warn-Ins"></span> 
                        </div> 
                        <span> ${message}</span> 
                    </div>`
                break;
            default:
                break;
        }
        if (actionButtons.length > 0) {
            let innerDiv = document.createElement('div');
            for (let elements of actionButtons) {
                if (elements.value) {
                    innerDiv.innerHTML += `<button class="cls-yes-btn ${elements.class}" id="${elements.id}" onclick="${elements.functionName}">${elements.label}</button>`;
                } else {
                    innerDiv.innerHTML += `<button class="cls-no-btn ${elements.class}" id="${elements.id}"  onclick="${elements.functionName}">${elements.label}</button>`;
                }
            }
            div.firstElementChild.appendChild(innerDiv);
        }
        document.getElementById('alert-modal').appendChild(div);
        document.getElementById('alert-modal').style.display = 'block';
    } else {
        document.getElementById('alert-modal').style.display = 'none';
    }
}

function closewindow() {
    window.close();
}

function closeAlertModal() {
    document.getElementById('alert-modal').style.display = 'none';
    while (document.getElementById('alert-modal').firstChild) {
        document.getElementById('alert-modal').removeChild(document.getElementById('alert-modal').firstChild);
    }
}