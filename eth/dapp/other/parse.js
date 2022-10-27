const ethers = require("ethers");
const ethsigutil = require("eth-sig-util");

// the top-level `privateKey` variable.
// const helloWorldSignature =
// '0x90a938f7457df6e8f741264c32697fc52f9a8f867c52dd70713d9d2d472f2e415d9c94148991bbe1f4a1818d1dff09165782749c877f5cf1eff4ef126e55714d1c';


const privateKey = Buffer.from("da060760048362f4970dde6048e5d8784d26c250278afc7fc03d3b6a0ac2e824").slice(0,32)
const helloWorldMessage = `0x${Buffer.from("123").toString("hex")}`;

// console.log(ethsigutil.personalSign(privateKey, helloWorldMessage));

// console.log(ethsigutil.recoverPersonalSignature({ data: helloWorldMessage, sig: ethsigutil.personalSign(privateKey, helloWorldMessage)}));


console.log(ethsigutil.recoverPersonalSignature({ data: "Hello world", sig: "0x3a656d3f37551325471110a86cb9034da50a506dc9849e241f63ca91e42613ac2e48bd0a7dd25a8be568ebef6432e3f140378220e8e0e5cc9e647b3b583dd4fc1c"}));

// it('should sign a message', function () {
// expect().toBe(
//   helloWorldSignature,
// );
// });

// it('should recover the address from a signature', function () {
// const address = addHexPrefix(privateToAddress(privateKey).toString('hex'));
// console.log(helloWorldMessage)

// console.log( ethsigutil.recoverPersonalSignature({
//     data: helloWorldMessage,
//     sig: "ox7d246d36aae13b0662c60c719c4a29da6f157a002c622ac4b90a73ea05b6aba57ad22b00b7613c0261d2f36895c4e1df718eb2bd70c036b707ce07886b8c4fcd1b",
// }))



//解析交易签名信息
// 0xb9aeb9ebf13de4f8187faa9279c6ec6688f55bcb0232b8fe91647e8c64e86bdf4eefdda67ab1b86590bcdf6623a9e65da72beab4bf57582fd3d63e167509851c1b
// 0xf86e048545d964b80082627094eba15228d988803e3bb740eca47a7cc7a0463fae880de0b6b3a764000080824056a0fdbb63387d3eabc114dc6257b55d8f4f780754253f9186df264ac31645fed994a05fa5836a9e9b77552f0aa2e50e1c56a03d4a16cf10558aaed400d0d9b1ac9295

// var s = ethers.utils.parseTransaction(sig);
// console.log("gasPrice:" + parseFloat(s.gasPrice));
// console.log("gasLimit:" + parseFloat(s.gasLimit));
// console.log("value:" + parseFloat(s.value));

// eth_perSign
//验证地址

// var sig = "0xf9b64df91dce172b40b460c762d56bca51784f136a546bb00c0a60ad714957f03256b447d3ba22f671e3a7beeb5b02917ab738b0c68f289352e267631205e2e01b";
// var s = ethers.utils.verifyMessage("79b6667af19b8fc8f10763aa4d57653e","0x0022782eb99d02c6b67384593f8a23cae553eea025da8b5d3540798c08676862789da3373a8ef98b5d4d77cd005524d0dbd3f528065357411d932cb5070f8e2c1c"
// );
// console.log(s);

// const a = ethsigutil.signTypedData(Buffer.from("6893106dcda86ea2b019068f0d3a3d8f8d1dd0140f7466d60782a2b7ea06b539").slice(0,32), {
//     data: {
//         "types": {
//             "EIP712Domain": [{
//                 "name": "name",
//                 "type": "string"
//             }, {
//                 "name": "version",
//                 "type": "string"
//             }, {
//                 "name": "chainId",
//                 "type": "uint256"
//             }],
//             "Permit": [{
//                 "name": "owner",
//                 "type": "address"
//             }, {
//                 "name": "value",
//                 "type": "uint256"
//             }, {
//                 "name": "timestamp",
//                 "type": "uint256"
//             }]
//         },
//         "domain": {
//             "name": "KCC Beowulf",
//             "version": "1",
//             "chainId": 321
//         },
//         "primaryType": "Permit",
//         "message": {
//             "owner": "0xc82D88971c1cC94c1e0821aDD449a4655C98E2BA",
//             "value": "Confirm your vote in your wallet",
//             "timestamp": 1663842404253
//         }
//     }
// })

// console.log(a)
//


// v3 v4
// const msgParams =JSON.stringify({
//     domain: {
//         //定义链
//         chainId: 1,
//         //  为您要签署的特定Contract提供一个用户友好的名称
//         name: 'Ether Mail',
//        // 如果名称不够，请添加验证Contract
//         verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
//         //只要让你知道最新版本。一定要确保字段名称正确
//         version: '1',
//     },

//     // 定义消息签名数据内容
//     message: {
//       /*
//             -你想要什么都行。只是一个JSON Blob，它对要发送的数据进行编码
//             -无必填字段
//             -这是特定于DApp的
//             -构建消息模式时，请尽可能明确。
//         */
//         contents: 'Hello, Bob!',
//         attachedMoneyInEth: 4.2,
//         from: {
//             name: 'Cow',
//             wallets: [
//                 '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
//                 '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
//             ],
//         },
//         to: [{
//             name: 'Bob',
//             wallets: [
//                 '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
//                 '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
//                 '0xB0B0b0b0b0b0B000000000000000000000000000',
//             ],
//         }, ],
//     },
//     //指下面*types*对象的键。
//     primaryType: 'Mail',
//     types: {
//         // EIP712Domain
//         EIP712Domain: [{
//                 name: 'name',
//                 type: 'string'
//             },
//             {
//                 name: 'version',
//                 type: 'string'
//             },
//             {
//                 name: 'chainId',
//                 type: 'uint256'
//             },
//             {
//                 name: 'verifyingContract',
//                 type: 'address'
//             },
//         ],
//         // 不是EIP712定义
//         Group: [{
//                 name: 'name',
//                 type: 'string'
//             },
//             {
//                 name: 'members',
//                 type: 'Person[]'
//             },
//         ],
//         //参考primaryType
//         Mail: [{
//                 name: 'from',
//                 type: 'Person'
//             },
//             {
//                 name: 'to',
//                 type: 'Person[]'
//             },
//             {
//                 name: 'contents',
//                 type: 'string'
//             },
//         ],
//         // 不是EIP712定义
//         Person: [{
//                 name: 'name',
//                 type: 'string'
//             },
//             {
//                 name: 'wallets',
//                 type: 'address[]'
//             },
//         ],
//     },
// });
// ethsigutil.recoverTypedSignature_v4({data: JSON.parse(msgParams), sig:'0x76f8145e7b9ece0c79d2331955f16bf090bf1f66b4132512ea848e631704da966a2e8a4e4f7d41af0b81b5e68bf624a2d25bdcb55927ab8f72990b324509feb81c'});
