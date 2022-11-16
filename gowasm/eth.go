
package main

import (
	"syscall/js"
    "crypto/md5"
	// "crypto/aes"
	"bytes"
	// "crypto/cipher"
	"fmt"
    // "encoding/hex"
)

func CalcMd5(this js.Value, p []js.Value) interface{} {
	ret := fmt.Sprintf("%x", md5.Sum([]byte(p[0].String())))
	return js.ValueOf(ret)
}


func PKCS5Padding(plaintext []byte, blockSize int) []byte{
    padding := blockSize-len(plaintext)%blockSize
    padtext := bytes.Repeat([]byte{byte(padding)},padding)
    return append(plaintext,padtext...)
}


// func EncryptAES(this js.Value, args[]js.Value) interface{} {
// 	key := []byte(args[0].String())
// 	// origData := []byte(p[1].String())

// 	origData := make([]byte, len(args[1]))
	
// 	js.CopyBytesToGo(origData, args[1])
	

// 	println("args",args[0].String(), args[1].String())
// 	// cipher, err := aes.NewCipher([]byte(key))

//     // if err != nil {
//     //     return  err
//     // }

//     // out := make([]byte, len(plainText)*2)

//     // cipher.Encrypt(out, []byte(plainText))

// 	// result := hex.EncodeToString(out)
	
//     // return js.ValueOf(result)

// 	block, err := aes.NewCipher(key)
//     if err != nil {
// 		println("err::::",err)
// 		ret1 := fmt.Sprintf("%x %x", err, block)
//         return js.ValueOf(ret1)  
//     }
// 	blockSize := block.BlockSize()

// 	println("err",blockSize)
//     origData = PKCS5Padding(origData,blockSize)
// 	blockMode := cipher.NewCBCEncrypter(block,key[:blockSize])
// 	crypted := make([]byte, len(origData))
//     blockMode.CryptBlocks(crypted,origData)
// 	println("crypted",crypted)
// 	ret := fmt.Sprintf("%x", crypted)
//     return js.ValueOf(ret) 
// }

func decodeTest(this js.Value, args []js.Value) interface{} {
	// 加密key
	println("123123123213213213123",args[0])
	keys := ([]byte)("KEY_PREFIX_" + args[0].String())
	buffer := make([]byte, args[1].Length())

	// 从js读取
	js.CopyBytesToGo(buffer, args[1])

	// ^ 示例解密函数 （ a ^ b ^ b = a)
	for i := range buffer {
		buffer[i] = buffer[i] ^ keys[i%len(keys)]
	}

	// 拷贝到js
	array := js.Global().Get("Uint8Array").New(len(buffer))
	js.CopyBytesToJS(array, buffer)

	return array
}

func registerCallbacks(){
	js.Global().Set("decodeTest",js.FuncOf(decodeTest))
	js.Global().Set("CalcMd5", js.FuncOf(CalcMd5))
	// js.Global().Set("EncryptAES",js.FuncOf(EncryptAES))
}





func main() {
	c := make(chan struct{},0)
        println("Go WebAssembly Initialized")
	registerCallbacks()
	<-c
}
