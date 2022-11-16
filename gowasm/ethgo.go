
package main

import (
    "crypto/aes"
    "encoding/hex"
	"fmt"
)

func EncryptAES(key string, plainText string) (string, error) {

    cipher, err := aes.NewCipher([]byte(key))

    if err != nil {
        return "", err
    }

    out := make([]byte, len(plainText))

    cipher.Encrypt(out, []byte(plainText))

    return hex.EncodeToString(out), nil
}

func DecryptAES(key string, encryptText string) (string, error) {
    decodeText, _ := hex.DecodeString(encryptText)

    cipher, err := aes.NewCipher([]byte(key))
    if err != nil {
        return "", err
    }

    out := make([]byte, len(decodeText))
    cipher.Decrypt(out, decodeText)

    return string(out[:]), nil
}


func main() {
	key := "thisisakeymustmorethan16"

	// plaintext
	text := "This is a secret"

	encrypt, err := EncryptAES(key, text)
	if err != nil {
		fmt.Println("___",err)
	}

	fmt.Println(encrypt)

}
