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




const utils = require("eth-sig-util")

// console.log(utils.recoverTypedSignature({
//    data:{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Person":[{"name":"name","type":"string"},{"name":"wallet","type":"address"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person"},{"name":"contents","type":"string"}]},"primaryType":"Mail","domain":{"name":"Ether Mail","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},"message":{"from":{"name":"Cow","wallet":"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},"to":{"name":"Bob","wallet":"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},"contents":"Hello, Bob!"}},
//    sig: "0xd760dd0fd1d4290b7662d4c9945fffc8341634c47dcb3761b01d390ddec7a9c03ea63f74d1cbda22302c7a9b4796a5160820cb1f117edb4dc35921b9b2c46a001c",

// }))



console.log(utils.recoverTypedSignature({
            data: {
                "types": {
                    "EIP712Domain": [{
                        "name": "name",
                        "type": "string"
                    }, {
                        "name": "version",
                        "type": "string"
                    }, {
                        "name": "chainId",
                        "type": "uint256"
                    }, {
                        "name": "verifyingContract",
                        "type": "address"
                    }],
                    "Person": [{
                        "name": "name",
                        "type": "string"
                    }, {
                        "name": "wallet",
                        "type": "address"
                    }],
                    "Mail": [{
                        "name": "from",
                        "type": "Person"
                    }, {
                        "name": "to",
                        "type": "Person"
                    }, {
                        "name": "contents",
                        "type": "string"
                    }]
                },
                "primaryType": "Mail",
                "domain": {
                    "name": "Ether Mail",
                    "version": "1",
                    "chainId": 1,
                    "verifyingContract": "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
                },
                "message": {
                    "from": {
                        "name": "Cow",
                        "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"
                    },
                    "to": {
                        "name": "Bob",
                        "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"
                    },
                    "contents": "Hello, Bob!"
                }
            },
            version:"V4",
            sign: "b8a6deccf90a93ccd285de6162db7a94454c4b9b5cfdb1735cd1ca5135a8279803adf0a2ede71711b96900194140b818d93e129bb25d7181ac589c31aae0c1be1c"
        }))