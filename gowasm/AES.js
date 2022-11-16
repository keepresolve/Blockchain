const CryptoJS = require("crypto-js");
const md5 = require('md5')
const crypto = require("crypto");

// //aes ecb 128 加密
//  const aseEncrypt = (content, secret) => {
//     const cipherChunks = [];
//     const cipher = crypto.createCipheriv("aes-ebc-128", secret);
//     console.log(111)
//     cipherChunks.push(cipher.update(content, "utf-8", "base64"));
//     cipherChunks.push(cipher.final("base64"));
// 	return cipherChunks.join('');
// }

// // //aes ecb 128 解密
//  const aseDecrypt = (content, secret) => {
//     const decipherChunks = [];
//     const decipher = crypto.createDecipher(AES_ALGORITHM, secret);
//     decipherChunks.push(decipher.update(content, BASE64, UTF8));
//     decipherChunks.push(decipher.final(UTF8));
//     return decipherChunks.join('');
//  }


function encrypt(token, authKey) {
   console.log(md5(authKey))
    const encrypted = CryptoJS.AES.encrypt(token,  md5(authKey),{
        // mode: CryptoJS.mode.ECB, // CBC算法
        // padding: CryptoJS.pad.Pkcs7, //使用pkcs7 进行padding 后端需要注意
      })

  return encrypted.toString();
    // return encrypted.ciphertext.toString()
}
// fe74188ef4b1bfa254f25d5ad625c9b7
function decrypt(token, authKey) {

  let bytes = "";
  try {
    bytes = CryptoJS.AES.decrypt(token, md5(authKey));
    bytes = bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    bytes = "";
  }
  return bytes === "" ? false : bytes;
}

const enData = encrypt("mysqlpassword","len16 secret key")
console.log(enData,decrypt("/nQYjvSxv6JU8l1a1iXJtw==", "len16 secret key"))


// function encryptByAES(encryption_key,secretPwd) {
//     // secretPwd = CryptoJS.MD5(secretPwd)
//     secretPwd =  md5(secretPwd)
//     // secretPwd = CryptoJS.enc.Utf8.parse(secretPwd);
//     // secretPwd = Buffer.from(secretPwd,wor).toString("hex")
//     var encrypted = CryptoJS.AES.encrypt(encryption_key, secretPwd,{
//         // iv: secretPwd,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     // const  r = encrypted.ciphertext.toString()
//     const  r = encrypted.toString()
//     // console.log('encryptByAES key: ',r);
//     return r
// }
// console.log(encryptByAES("mysqlpassword","len16 secret key"))
// // console.log(aseDecrypt("1","1234"))

// const hextoUint8Array = hexString => new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
// function test(key, sert){
//    return  CryptoJS.AES.encrypt(key, CryptoJS.ECB, { mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     }).toString()
// }
// // "U2FsdGVkX187cDCabFfYJWMMHeoxuxjuQvNyfx05JlXf8vdji5hd3eeD0NaZepdwWU78uTqxrFsQFXCLxjWP/d2DV3MnTEhXzllIhpIhZLzWBm8HAz/0K2+LcUbHRhc4"
// console.log(test("ae7caad0a7631deb6875be8b3ab0be70b7b753b124f672c527e6a6e6cf018b91",'csy123456'))

// var secretKey = "len16 secret key"
// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('mysqlpassword', secretKey).toString();

// // Decrypt
// var bytes  = CryptoJS.AES.decrypt("BhyQ4guOqv5zEJPukh7SwA==", secretKey);
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(ciphertext, originalText )

//     var data = "156156165152165156156";
//     console.log('Original cleartext: ' + data);
//     var algorithm = 'aes-128-ecb';
//     var key = '78541561566';
//     var clearEncoding = 'utf8';
//     var iv = "";
//     //var cipherEncoding = 'hex';
//     //If the next line is uncommented, the final cleartext is wrong.
//     var cipherEncoding = 'base64';
//     var cipher = crypto.createCipheriv(algorithm, key,iv);
//     var cipherChunks = [];
//     cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
//     cipherChunks.push(cipher.final(cipherEncoding));
//     console.log(cipherEncoding + ' ciphertext: ' + cipherChunks.join(''));
//     var decipher = crypto.createDecipheriv(algorithm, key,iv);
//     var plainChunks = [];
//     for (var i = 0;i < cipherChunks.length;i++) {
//       plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
//     }
//     plainChunks.push(decipher.final(clearEncoding));
//     console.log("UTF8 plaintext deciphered: " + plainChunks.join(''));

// const fillKey = (key) => {
//     return key
//     const filledKey = Buffer.alloc(128 / 8);
//     const keys = Buffer.from(key);
//     if (keys.length < filledKey.length) {
//         filledKey.map((b, i) => filledKey[i] = keys[i]);
//     }
//     return filledKey;
// }

// const encrypt = (word,str) => {
//     const key = CryptoJS.enc.Utf8.parse(fillKey(str)); //16位
//     let encrypted = '';
//     if (typeof(word) == 'string') {
//         let srcs = CryptoJS.enc.Utf8.parse(word);
//         console.log(srcs)
//         encrypted = CryptoJS.AES.encrypt(srcs, key, {
//             mode: CryptoJS.mode.ECB,
//             padding: CryptoJS.pad.Pkcs7
//         });
//     } else if (typeof(word) == 'object') {//对象格式的转成json字符串
//         let data = JSON.stringify(word);
//         let srcs = CryptoJS.enc.Utf8.parse(data);
//         encrypted = CryptoJS.AES.encrypt(srcs, key, {
//             mode: CryptoJS.mode.ECB,
//             padding: CryptoJS.pad.Pkcs7
//         })
//     }
//     return encrypted.ciphertext.toString();
// }

// console.log(encrypt("12345678","11111111"))

// const sKey = CryptoJS.enc.Utf8.parse('len16 secret key');
const sKey = CryptoJS.enc.Utf8.parse('len16 secret key');

 function EncryptAES(s) {
  // key 和 iv 使用同一个值
  const encrypted = CryptoJS.AES.encrypt(s, sKey, {
    iv: sKey,
    mode: CryptoJS.mode.CBC, // CBC算法
    padding: CryptoJS.pad.Pkcs7, //使用pkcs7 进行padding 后端需要注意
  });

  return encrypted.toString();
}

 function DecryptAES(s) {
  // key 和 iv 使用同一个值
  const decrypted = CryptoJS.AES.decrypt(s, sKey, {
    iv: sKey,
    mode: CryptoJS.mode.CBC, // CBC算法
    padding: CryptoJS.pad.Pkcs7, //使用pkcs7 进行padding 后端需要注意
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

console.log(EncryptAES("mysqlpassword"))
console.log(DecryptAES(EncryptAES("mysqlpassword")))
