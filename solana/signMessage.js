const nacl = require("tweetnacl")
nacl.util = require('tweetnacl-util');
const bs58 = require('bs58')


const secretKey = ''
// const address = ""
const message = new Uint8Array([1,2])

// const keyPair = nacl.sign.keyPair.fromSecretKey(new Uint8Array(Buffer.from(secretKey, 'hex')))
const keyPair = nacl.sign.keyPair()


const signature = nacl.sign.detached(message, keyPair.secretKey)

let address =  bs58.encode(keyPair.publicKey)

console.log("address",address)
console.log( 'address转init8arrya ',  bs58.decode(address) ,  keyPair.publicKey )
console.log("签名数据",signature)
console.log( '验证签名', nacl.sign.detached.verify(message, signature, keyPair.publicKey))



// [84,111,32,97,118,111,105,100,32,100,105,103,105,116,97,108,32,100,111,103,110,97,112,112,101,114,115,44,10,32,32,32,32,115,105,103,110,32,98,101,108,111,119,32,116,111,32,97,117,116,104,101,110,116,105,99,97,116,101,32,119,105,116,104,32,67,114,121,112,116,111,67,111,114,103,105,115]

// 0: 10097246
// 1: 14791502
// 2: 9052577
// 3: 16132461
// 4: 21320544
// 5: 44266253
// 6: 63200880
// 7: 39575789
// 8: 8103244
// 9: 727204
// 10: 0
// '{"signature":{"type":"Buffer","data":[183,48,138,222,158,219,211,73,157,207,247,53,57,68,209,172,152,223,115,150,148,91,159,238,73,164,92,38,150,18,251,131,26,69,157,119,195,92,80,20,209,205,203,231,56,227,246,32,77,217,153,187,253,185,150,213,92,152,100,68,224,197,165,10]},"publicKey":"3zG7MWVbMn3sgpUc2o9NXUwSN9PYxQkhbpTayUaCbfWM"}'