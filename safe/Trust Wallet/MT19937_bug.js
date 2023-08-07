// 引入 mersenne-twister 库
const MersenneTwister=require('mersenne-twister')
const sha256 = require("sha256")
// 定义种子，可以使用用户提供的熵作为种子
const entropy = 'face'; // 用户提供的随机字符
const seed = sha256(entropy); // 使用 SHA256 散列算法将随机字符转换为种子
// https://lab.miguelmota.com/ethereum-hdwallet/example/?
console.log("__,",seed)
// 0282d9b79f42c74c1550b20ff2dd16aafc3fe5d8ae9a00b2f66996d0ae882775
// 4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8
// 创建 MersenneTwister 实例并设置种子
const mt = new MersenneTwister(seed);

// 生成 256 位的伪随机数序列，作为私钥
const privateKey = [];
for (let i = 0; i < 8; i++) {
  privateKey.push(mt.random_int());
}

// 将私钥转换为十六进制字符串
const privateKeyHex = privateKey.map(num => num.toString(16).padStart(8, '0')).join('');
console.log(privateKeyHex);
