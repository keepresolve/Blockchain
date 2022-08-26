const ethers = require("ethers");
const ethsigutil = require("eth-sig-util");

// the top-level `privateKey` variable.
// const helloWorldSignature =
// '0x90a938f7457df6e8f741264c32697fc52f9a8f867c52dd70713d9d2d472f2e415d9c94148991bbe1f4a1818d1dff09165782749c877f5cf1eff4ef126e55714d1c';


const privateKey = Buffer.from("", "hex");
const helloWorldMessage = `0x${Buffer.from("Hello, world!").toString("hex")}`;

// console.log(ethsigutil.personalSign(privateKey, helloWorldMessage));

// console.log(ethsigutil.recoverPersonalSignature({ data: helloWorldMessage, sig: ethsigutil.personalSign(privateKey, helloWorldMessage)}));

// it('should sign a message', function () {
// expect().toBe(
//   helloWorldSignature,
// );
// });

// it('should recover the address from a signature', function () {
// const address = addHexPrefix(privateToAddress(privateKey).toString('hex'));

// expect(
//   recoverPersonalSignature({
//     data: helloWorldMessage,
//     signature: helloWorldSignature,
//   }),
// ).toBe(address);
// });

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
// var s = ethers.utils.verifyMessage("4V",sig);
// console.log(s);

//
