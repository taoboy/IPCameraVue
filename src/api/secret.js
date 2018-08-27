const CryptoJS = require('crypto-js');  //引用AES源码js
    
const key = CryptoJS.enc.Utf8.parse("xgibc12345678001");  ////秘钥必须为：8/16/32位
//const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

//解密方法
function Decrypt(word) {
    var decryptedData = CryptoJS.AES.decrypt(word, key, {  
        mode: CryptoJS.mode.ECB,  
        padding: CryptoJS.pad.ZeroPadding  
    }); 
    return decryptedData.toString(CryptoJS.enc.Utf8);
}

//加密方法
function Encrypt(word) {
	var encryptedData = CryptoJS.AES.encrypt(word, key, {  
        mode: CryptoJS.mode.ECB,  
        padding: CryptoJS.pad.ZeroPadding  
    }); 
    return encryptedData.toString();
}

export{Encrypt,Decrypt}

