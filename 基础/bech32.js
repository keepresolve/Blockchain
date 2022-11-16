let { bech32, bech32m } = require('bech32')
const secp256k1 = require('secp256k1')

const privateKey = "4ce9ac676223c48e84fba724b3220e35d722f35444f434ba058f5553424f20c0"

var crypto = require('crypto');

function sha256ripemd160 (buf) {
    var h256  = crypto.createHash('sha256').update(buf).digest();
    var ripemd160  = crypto.createHash('ripemd160').update(h256).digest()
    return ripemd160
  };
  ;


const pubK = secp256k1.publicKeyCreate(Buffer.from(privateKey, 'hex'))
const hash = sha256ripemd160(Buffer.from(pubK))
// console.log("hash",hash)
var words = bech32.toWords(hash)
console.log("fromWords",bech32.fromWords(words))
// console.log(new Uint8Array(Buffer.from(hash, "hex")))

console.log("words",words)


// var address = bech32.encode('cosmos', Array.from(Buffer.from(words)))
// console.log(address)
// console.log(bech32.decode(address))

const words1= bech32.decode("cosmos162heh9rd52hp58ax53fcttswdtfsgzcv5xhwya")


console.log(bech32.fromWords(words1.words))
