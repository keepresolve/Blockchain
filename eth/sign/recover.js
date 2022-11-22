// // Create and initialize EdDSA context
// // (better do it once and reuse it)
// var EdDSA = require('elliptic').eddsa;
// var ec = new EdDSA('ed25519');
// var secp256k1 = new (require('elliptic')).ec('secp256k1');
// // // Create key pair from secret
// var key = ec.keyFromSecret('693e3c'); // hex string, array or Buffer

// // // Sign the message's hash (input must be an array, or a hex-string)
// var msgHash = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
// var signature = key.sign(msgHash).toHex();

// // // Verify signature
// console.log(key.verify(msgHash, signature));

// // CHECK WITH NO PRIVATE KEY

// // Import public key

// var krecoverPubKeyey = secp256k1.getKeyRecoveryParam(msgHash, signature );
// console.log(krecoverPubKeyey,key)
// // Verify signature
// var signature = '70bed1...';
// console.log(key.verify(msgHash, signature));
// import utils from "eth-sig-util";
// import { ethers } from "ethers";





const utils = require("eth-sig-util");
const { ethers } = require("ethers");

 function isHexString(value, length) {
    if (typeof(value) !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false
    }
    if (length && value.length !== 2 + 2 * length) { return false; }
    return true;
}

const signData = "0x0b8b202f8af0180849502f900849502f91a825208945c39bc68e58a242a624e4fc96be77a383c52002d80b844a9059cbb000000000000000000000000bffe3510b10a7f89fb836266f330f8776c0dc63d000000000000000000000000000000000000000000000003ad9151fb0c67c000c080a0bf36376e3a7edc2190b08b0ede82ea43da2f80bc060d7c7d22f579e5f5a8247ca0305eaeed8d684a470f89264b895fc7f19bb9eda55b1afd0f59e715fbb2390e2c"

console.log(signData.length)


// 解析交易签名
console.log(ethers.utils.parseTransaction("0x02f8af0180849502f900849502f91a825208945c39bc68e58a242a624e4fc96be77a383c52002d80b844a9059cbb000000000000000000000000bffe3510b10a7f89fb836266f330f8776c0dc63d000000000000000000000000000000000000000000000003ad9151fb0c67c000c080a0bf36376e3a7edc2190b08b0ede82ea43da2f80bc060d7c7d22f579e5f5a8247ca0305eaeed8d684a470f89264b895fc7f19bb9eda55b1afd0f59e715fbb2390e2c"))






//处理ethers 和 utis包的差异
// (async function () {
//   const ethersParams = {
//     // primaryType: 'OrderComponents',
//     types: {
//       // EIP712Domain: [
//       //   { name: 'name', type: 'string' },
//       //   { name: 'version', type: 'string' },
//       //   { name: 'chainId', type: 'uint256' },
//       //   { name: 'verifyingContract', type: 'address' }
//       // ],
//       OrderComponents: [
//         { name: "offerer", type: "address" },
//         { name: "zone", type: "address" },
//         { name: "offer", type: "OfferItem[]" },
//         { name: "consideration", type: "ConsiderationItem[]" },
//         { name: "orderType", type: "uint8" },
//         { name: "startTime", type: "uint256" },
//         { name: "endTime", type: "uint256" },
//         { name: "zoneHash", type: "bytes32" },
//         { name: "salt", type: "uint256" },
//         { name: "conduitKey", type: "bytes32" },
//         { name: "counter", type: "uint256" },
//       ],
//       OfferItem: [
//         { name: "itemType", type: "uint8" },
//         { name: "token", type: "address" },
//         { name: "identifierOrCriteria", type: "uint256" },
//         { name: "startAmount", type: "uint256" },
//         { name: "endAmount", type: "uint256" },
//       ],
//       ConsiderationItem: [
//         { name: "itemType", type: "uint8" },
//         { name: "token", type: "address" },
//         { name: "identifierOrCriteria", type: "uint256" },
//         { name: "startAmount", type: "uint256" },
//         { name: "endAmount", type: "uint256" },
//         { name: "recipient", type: "address" },
//       ],
//     },

//     domain: { name: "Seaport", version: "1.1", chainId: "137", verifyingContract: "0x00000000006c3852cbEf3e08E8dF289169EdE581" },
//     message: {
//       offerer: "0xEfD6Ea65D774fFd95068CCFC8c365b2aab26f9c0",
//       offer: [{ itemType: "3", token: "0xba6666B118f8303F990f3519DF07e160227cCE87", identifierOrCriteria: "7", startAmount: "1", endAmount: "1" }],
//       consideration: [
//         { itemType: "1", token: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", identifierOrCriteria: "0", startAmount: "103703600000000000000000", endAmount: "103703600000000000000000", recipient: "0xEfD6Ea65D774fFd95068CCFC8c365b2aab26f9c0" },
//         { itemType: "1", token: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", identifierOrCriteria: "0", startAmount: "2802800000000000000000", endAmount: "2802800000000000000000", recipient: "0x0000a26b00c1F0DF003000390027140000fAa719" },
//         { itemType: "1", token: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", identifierOrCriteria: "0", startAmount: "5605600000000000000000", endAmount: "5605600000000000000000", recipient: "0xb17e8166e683b592e32F46E27d2e093E8D4622A7" },
//       ],
//       startTime: "1669007786",
//       endTime: "1671599786",
//       orderType: "1",
//       zone: "0x0000000000000000000000000000000000000000",
//       zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
//       salt: "24446860302761739304752683030156737591518664810215442929818515809849207498072",
//       conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
//       totalOriginalConsiderationItems: "3",
//       counter: "0",
//     },
//   };

//   const metaMaskparams = {
//     primaryType: "OrderComponents",
//     types: {
//       EIP712Domain: [
//         { name: "name", type: "string" },
//         { name: "version", type: "string" },
//         { name: "chainId", type: "uint256" },
//         { name: "verifyingContract", type: "address" },
//       ],
//       OrderComponents: [
//         { name: "offerer", type: "address" },
//         { name: "zone", type: "address" },
//         { name: "offer", type: "OfferItem[]" },
//         { name: "consideration", type: "ConsiderationItem[]" },
//         { name: "orderType", type: "uint8" },
//         { name: "startTime", type: "uint256" },
//         { name: "endTime", type: "uint256" },
//         { name: "zoneHash", type: "bytes32" },
//         { name: "salt", type: "uint256" },
//         { name: "conduitKey", type: "bytes32" },
//         { name: "counter", type: "uint256" },
//       ],
//       OfferItem: [
//         { name: "itemType", type: "uint8" },
//         { name: "token", type: "address" },
//         { name: "identifierOrCriteria", type: "uint256" },
//         { name: "startAmount", type: "uint256" },
//         { name: "endAmount", type: "uint256" },
//       ],
//       ConsiderationItem: [
//         { name: "itemType", type: "uint8" },
//         { name: "token", type: "address" },
//         { name: "identifierOrCriteria", type: "uint256" },
//         { name: "startAmount", type: "uint256" },
//         { name: "endAmount", type: "uint256" },
//         { name: "recipient", type: "address" },
//       ],
//     },

//     domain: { name: "Seaport", version: "1.1", chainId: "137", verifyingContract: "0x00000000006c3852cbEf3e08E8dF289169EdE581" },
//     message: {
//       offerer: "0xEfD6Ea65D774fFd95068CCFC8c365b2aab26f9c0",
//       offer: [{ itemType: "3", token: "0xba6666B118f8303F990f3519DF07e160227cCE87", identifierOrCriteria: "7", startAmount: "1", endAmount: "1" }],
//       consideration: [
//         { itemType: "1", token: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", identifierOrCriteria: "0", startAmount: "103703600000000000000000", endAmount: "103703600000000000000000", recipient: "0xEfD6Ea65D774fFd95068CCFC8c365b2aab26f9c0" },
//         { itemType: "1", token: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", identifierOrCriteria: "0", startAmount: "2802800000000000000000", endAmount: "2802800000000000000000", recipient: "0x0000a26b00c1F0DF003000390027140000fAa719" },
//         { itemType: "1", token: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", identifierOrCriteria: "0", startAmount: "5605600000000000000000", endAmount: "5605600000000000000000", recipient: "0xb17e8166e683b592e32F46E27d2e093E8D4622A7" },
//       ],
//       startTime: "1669007786",
//       endTime: "1671599786",
//       orderType: "1",
//       zone: "0x0000000000000000000000000000000000000000",
//       zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
//       salt: "24446860302761739304752683030156737591518664810215442929818515809849207498072",
//       conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
//       totalOriginalConsiderationItems: "3",
//       counter: "0",
//     },
//   };
//   const privateKey = "a0ec90b87ac3c654bb26ffe220eddca15d764f464de93c958089b7c369beca20";

//   const signData = utils.signTypedMessage(
//     Buffer.from(privateKey, "hex"),
//     {
//       data: metaMaskparams,
//     },
//     "V4"
//   );

//   let wallet = new ethers.Wallet(Buffer.from("a0ec90b87ac3c654bb26ffe220eddca15d764f464de93c958089b7c369beca20", "hex"));

//   const signature = await wallet._signTypedData(ethersParams.domain, ethersParams.types, ethersParams.message);
//   console.log("----", signature == signData, signature, signData);
// })();
