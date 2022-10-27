var Web3EthAbi = require("web3-eth-abi");
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

Web3EthAbi.decodeParameter('string',ecodeApprovaldata)

