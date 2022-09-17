const {
    AptosClient,
    AptosAccount,
    FaucetClient,
    BCS,
    TxnBuilderTypes
} = require("aptos")
const bip39 = require('bip39')
const Nacl = require("tweetnacl")
const { derivePath } = require("ed25519-hd-key");
const  SHA3    = require("js-sha3")

const bytesToHex = (buffer) =>
Array.from(buffer)
  .map((x) => x.toString(16).padStart(2, "0"))
  .join("");

const mnemonic = "shoot island position soft burden budget tooth cruel issue economy destroy above";

const getPriveteKey = function(mnemonics){

    const normalizeMnemonics = mnemonics
      .trim()
      .split(/\s+/)
      .map((part) => part.toLowerCase())
      .join(" ");

      
    const {key} = derivePath("m/44'/637'/0'/0'/0'", bytesToHex(bip39.mnemonicToSeedSync(normalizeMnemonics)));
    let  { secretKey }  =  Nacl.sign.keyPair.fromSeed(new Uint8Array(key).slice(0, 32)); 

    secretKey = Uint8Array.from((bytesToHex(secretKey.slice(0,32)).match(/.{1,2}/g)).map((byte) => parseInt(byte, 16)))
    secretKey = secretKey.startsWith("0x")? secretKey: "0x"+secretKey
    console.log(secretKey)
    return  secretKey
}
function getPublicKey(priveteKey){

    const zeroPadHex = (hex) => (hex.length % 2 === 1 ? `0${hex}` : hex);
    priveteKey = zeroPadHex(hex);


    let  { secretKey }  =  Nacl.sign.keyPair.fromSeed( Uint8Array.from(hexToBytes(this.noPrefix())).slice(0, 32)); 
    secretKey =  bytesToHex(secretKey.slice(0,32))
    secretKey = secretKey.startsWith("0x")? secretKey: "0x"+secretKey
    console.log(secretKey)
    return  secretKey
        
}
function getAddress(priveteKey){
    const hash = SHA3.sha3_256.create();
    hash.update();
    hash.update("\x00");
    this.authKeyCached = new HexString(hash.hex());
}
const p = getPriveteKey(mnemonic)
console.log()


const a1 = AptosAccount.fromDerivePath("m/44'/637'/0'/0'/0'", mnemonic).toPrivateKeyObject()

console.log(a1)


