import {DECRYPTING_KEY} from './constant.js';
var usercontext = {};

var userContextConfiguration = {
    /*
    This method is use to load configuration from the content stack in stripo plugin app.
    * @param: userContextObect.
    */
    loadUserContext: async function (userContextObject) {
        //   var bytes = CryptoJS.AES.decrypt(userContextObject, DECRYPTING_KEY);
        //   var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
        //   usercontext = decryptedData;
             usercontext = userContextObject;
        document.getElementById("templatename").innerText = usercontext.TemplateName;
        return "Ok";
    }
}

export {userContextConfiguration, usercontext }