var Web3EthAbi = require("web3-eth-abi");
var abi = require("./abi/erc20")
const ecodeApprovaldata = Web3EthAbi.encodeFunctionSignature({
  constant: false,
  inputs: [
    {
      name: "_spender",
      type: "address",
    },
    {
      name: "_value",
      type: "uint256",
    },
  ],
  name: "approve",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function",
});
const ecode1155Aprovaldata = Web3EthAbi.encodeFunctionSignature({
  constant: false,
  inputs: [
    { internalType: "address", name: "to", type: "address" },
    { internalType: "bool", name: "approved", type: "bool" },
  ],
  name: "setApprovalForAll",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function",
});

console.log(ecodeApprovaldata,    ecode1155Aprovaldata);
// doc
// https://learnblockchain.cn/docs/web3.js/web3-eth-abi.html

console.log(abi)
const a = "0x7ff36ab50000000000000000000000000000000000000000000000001c9490f3ceea491d00000000000000000000000000000000000000000000000000000000000000800000000000000000000000007068dd34531c8f7656b540e6290e352c880f68220000000000000000000000000000000000000000000000000000000063689ea40000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c778417e063141139fce010982780140aa0cd5ab00000000000000000000000071d82eb6a5051cff99582f4cdf2ae9cd402a4882"
console.log(Web3EthAbi.decodeParameters(abi, a))
