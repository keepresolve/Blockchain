const TronWeb = require("tronWeb");
// // verifyMessage

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
});
async function init(){
    tronWeb.setAddress("TNzgGfiagKFG9QpbXBWzyUdNCwmMN8KXjM")
    console.log(await tronWeb.trx.verifyMessage("74726f6e626574", "0x8429c8e2779965cedcc1c46adcedc2393872338a76cdf1136782bc8f46c38b61766e8214c3af987c853ba9d4b496a09d90c4c54c3d3186ce91b7d31e4940da47a1c", "TNzgGfiagKFG9QpbXBWzyUdNCwmMN8KXjM"))
    // console.log(await TronWeb.Trx.verifySignature("6269747369676e383838242340352131322462697", "TEKUxFjm2crG9cNRTiqJsyWBQ8iE7yq3A1", "0x1dd2fe61fb920abd54eda5138001cc8a231686a27b995ed99c4fd2d27bb6e7319f99ccf716e52e34fabf5b99fcac5131f6132718f6de317b92913abfba850701b" ))
}

init()

// const address = tronWeb.address.toHex(
//   tronWeb.address.fromPrivateKey("")
// ).toLowerCase();
// console.log(address)

// async function init() {
//   tronWeb.setAddress("TEKUxFjm2crG9cNRTiqJsyWBQ8iE7yq3A1");
//   var str = "helloworld";
//   // convert to hex format and remove the beginning "0x"
//   var hexStrWithout0x = tronWeb.toHex(str).replace(/^0x/, "");
//   // conert hex string to byte array
//   var byteArray = tronWeb.utils.code.hexStr2byteArray(hexStrWithout0x);
//   // keccak256 computing, then remove "0x"
//   var strHash = tronWeb.sha3(byteArray).replace(/^0x/, "");
//   // sign
//   var signedStr = await tronWeb.trx.sign(strHash).catch((err) => err);
//   var tail = signedStr.substring(128, 130);
//   if (tail == "01") {
//     signedStr = signedStr.substring(0, 128) + "1c";
//   } else if (tail == "00") {
//     signedStr = signedStr.substring(0, 128) + "1b";
//   }

//   // verify the signature
//   var res = await tronWeb.trx.verifyMessage(strHash, signedStr, "TPNcZ1j55FrGpsaw6K6rVjuL4HfT8ZbBf7").catch((err) => err);
//   console.log(res);
// }
// init();
