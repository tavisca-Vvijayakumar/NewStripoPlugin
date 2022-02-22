var usercontext = {};

var userContextConfiguration = {
    /*
    This method is use to load configuration from the content stack in stripo plugin app.
    * @param: userContextObect.
    */
    loadUserContext: async function (userContextObject) {
        // The Below 3 line code for live
            var bytes = CryptoJS.AES.decrypt(userContextObject, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 
            usercontext = decryptedData;
            
        // The below 1 line code for dev 
           //  usercontext = userContextObject;
        document.getElementById("templatename").innerText = usercontext.TemplateName;
        return "Ok";
    }
}

export {userContextConfiguration, usercontext }