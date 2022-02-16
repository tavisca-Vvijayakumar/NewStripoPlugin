function actionToSendMail(){
    if(!document.querySelector('.cls-mailing-section').classList.contains('cls-mail-section-section-show')){
        document.querySelector('#btnemailsend').classList.add('cls-btn-pressed');
        document.querySelector('.cls-mailing-section').classList.remove('cls-mail-section-section-hide'); 
        document.querySelector('.cls-mailing-section').classList.add('cls-mail-section-section-show');        
    }else{
        document.querySelector('.cls-mailing-section').classList.remove('cls-mail-section-section-show');
        document.querySelector('.cls-mailing-section').classList.add('cls-mail-section-section-hide');
        document.querySelector('#btnemailsend').classList.remove('cls-btn-pressed');
    }    
}
function clickPredefined(){
    if(document.querySelector('.cls-mail-prefined-valus').style.display == 'none'){
        document.querySelector('.cls-arrow-icon-mail-form').src = "./img/svg-icons/angle-down.svg";
        document.querySelector('.cls-mail-prefined-valus').style.display = 'block';
    }else{
        document.querySelector('.cls-arrow-icon-mail-form').src = "./img/svg-icons/angle-right.svg";
        document.querySelector('.cls-mail-prefined-valus').style.display = 'none';
    }
}
    