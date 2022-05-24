
const ethers = require('ethers')
var sig = "0xf86e048545d964b80082627094eba15228d988803e3bb740eca47a7cc7a0463fae880de0b6b3a764000080824056a0fdbb63387d3eabc114dc6257b55d8f4f780754253f9186df264ac31645fed994a05fa5836a9e9b77552f0aa2e50e1c56a03d4a16cf10558aaed400d0d9b1ac9295";
var s = ethers.utils.parseTransaction(sig);
console.log(s);
console.log("gasPrice:" + parseFloat(s.gasPrice));
console.log("gasLimit:" + parseFloat(s.gasLimit));
console.log("value:" + parseFloat(s.value));
