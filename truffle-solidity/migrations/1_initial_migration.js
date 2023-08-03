// const Migrations = artifacts.require("Migrations");
const HDWalletProvider = require("@truffle/hdwallet-provider");
// module.exports = function (deployer) {
//   deployer.deploy(Migrations);
// };

// const SimpleStorage = artifacts.require("WeatherOracle");

// module.exports = function(deployer) {
//     deployer.deploy(SimpleStorage);
// };

//erc20 token

// const SimpleStorage = artifacts.require("TokenERC20");

// module.exports = function(deployer) {
//     deployer.deploy(SimpleStorage);
// };

//批量转账合约
// const MultiSender = artifacts.require("MultiSender");

// 
const WeatherOracle = artifacts.require("WeatherOracle");
module.exports = function(deployer) {
    deployer.deploy(WeatherOracle, "address");
};
// module.exports = function(deployer) {
//     deployer.deploy(SimpleStorage,0,'0xEba15228d988803E3bB740ecA47a7cC7a0463fAe');
// };