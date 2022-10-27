// Create and initialize EdDSA context
// (better do it once and reuse it)
var EdDSA = require('elliptic').eddsa;
var ec = new EdDSA('ed25519');
var secp256k1 = new (require('elliptic')).ec('secp256k1');
// // Create key pair from secret
var key = ec.keyFromSecret('693e3c'); // hex string, array or Buffer

// // Sign the message's hash (input must be an array, or a hex-string)
var msgHash = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var signature = key.sign(msgHash).toHex();

// // Verify signature
console.log(key.verify(msgHash, signature));

// CHECK WITH NO PRIVATE KEY

// Import public key

var krecoverPubKeyey = secp256k1.getKeyRecoveryParam(msgHash, signature );
console.log(krecoverPubKeyey,key)
// Verify signature
// var signature = '70bed1...';
// console.log(key.verify(msgHash, signature));