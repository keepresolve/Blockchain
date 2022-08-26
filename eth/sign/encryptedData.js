const bob = {
  ethereumPrivateKey: "7e5374ec2ef0d91761a6e72fdf8f6ac665519bfdf6da0a2329cf0d804514b816",
  encryptionPrivateKey: "flN07C7w2Rdhpucv349qxmVRm/322gojKc8NgEUUuBY=",
  encryptionPublicKey: "C5YMNdqE4kLgxQhJO1MfuQcHP5hjVSXzamzd/TxlR0U=",
};

const secretMessage = "My name is Satoshi Buterin";

const encryptedData = {
  version: "x25519-xsalsa20-poly1305",
  nonce: "1dvWO7uOnBnO7iNDJ9kO9pTasLuKNlej",
  ephemPublicKey: "FBH1/pAEHOOW14Lu3FWkgV3qOEcuL78Zy+qW1RwzMXQ=",
  ciphertext: "f8kBcl/NCyf3sybfbwAKk/np2Bzt9lRVkZejr6uh5FgnNlH/ic62DZzy",
};

function decrypt({ encryptedData, privateKey }) {
  if (!encryptedData) {
    throw new Error("Missing encryptedData parameter");
  } else if (!privateKey) {
    throw new Error("Missing privateKey parameter");
  }

  switch (encryptedData.version) {
    case "x25519-xsalsa20-poly1305": {
      // string to buffer to UInt8Array
      const recieverPrivateKeyUint8Array = nacl_decodeHex(privateKey);
      const recieverEncryptionPrivateKey = nacl.box.keyPair.fromSecretKey(recieverPrivateKeyUint8Array).secretKey;

      // assemble decryption parameters
      const nonce = naclUtil.decodeBase64(encryptedData.nonce);
      const ciphertext = naclUtil.decodeBase64(encryptedData.ciphertext);
      const ephemPublicKey = naclUtil.decodeBase64(encryptedData.ephemPublicKey);

      // decrypt
      const decryptedMessage = nacl.box.open(ciphertext, nonce, ephemPublicKey, recieverEncryptionPrivateKey);

      // return decrypted msg data
      let output;
      try {
        output = naclUtil.encodeUTF8(decryptedMessage);
      } catch (err) {
        throw new Error("Decryption failed.");
      }

      if (output) {
        return output;
      }
      throw new Error("Decryption failed.");
    }

    default:
      throw new Error("Encryption type/version not supported.");
  }
}
