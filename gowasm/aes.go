// package main

// import (
//     "fmt"
//     "crypto/cipher"
//     "crypto/aes"
//     "bytes"
//     "encoding/base64"
// 	"encoding/hex"
// )

// //@brief:填充明文
// func PKCS5Padding(plaintext []byte, blockSize int) []byte{
//     padding := blockSize-len(plaintext)%blockSize
//     padtext := bytes.Repeat([]byte{byte(padding)},padding)
//     return append(plaintext,padtext...)
// }

// //@brief:去除填充数据
// func PKCS5UnPadding(origData []byte) []byte{
//     length := len(origData)
//     unpadding := int(origData[length-1])
//     return origData[:(length - unpadding)]
// }

// //@brief:AES加密
// func AesEncrypt(origData, key []byte) ([]byte, error){
//     block, err := aes.NewCipher(key)
//     if err != nil {
//         return nil, err
//     }

// 	//AES分组长度为128位，所以blockSize=16，单位字节
//     blockSize := block.BlockSize()
//     origData = PKCS5Padding(origData,blockSize)					
//     blockMode := cipher.NewCBCEncrypter(block,key[:blockSize])	//初始向量的长度必须等于块block的长度16字节
//     crypted := make([]byte, len(origData))
//     blockMode.CryptBlocks(crypted,origData)
//     return crypted, nil
// }

// //@brief:AES解密
// func AesDecrypt(crypted, key []byte) ([]byte, error) {
//     block, err := aes.NewCipher(key)
//     if err != nil {
//         return nil, err
//     }

// 	//AES分组长度为128位，所以blockSize=16，单位字节
//     blockSize := block.BlockSize()
//     blockMode := cipher.NewCBCDecrypter(block, key[:blockSize])	//初始向量的长度必须等于块block的长度16字节
//     origData := make([]byte, len(crypted))
//     blockMode.CryptBlocks(origData, crypted)
//     origData = PKCS5UnPadding(origData)
//     return origData, nil
// }

// func main(){
// 	//key的长度必须是16、24或者32字节，分别用于选择AES-128, AES-192, or AES-256
//     var aeskey = []byte("91e99dbce3ed82adf3795d87129b6aa2")
//     pass := []byte("mysqlpassword")
//     xpass, err := AesEncrypt(pass,aeskey)
//     if err != nil {
//         fmt.Println(err)
//         return
//     }

//     pass64 := base64.StdEncoding.EncodeToString(xpass)
//     fmt.Printf("加密后:%v\n",pass64)
// 	fmt.Printf("加密后:%v\n", hex.EncodeToString(xpass) )
	
// 	// pass64 = "Mc7ICv1/NkD+YZi7JCnUO5ga8tjARCeaZLA+SUC/rNk="

//     bytesPass, err := base64.StdEncoding.DecodeString(pass64)
//     if err != nil {
//         fmt.Println(err)
//         return
//     }
// 	println("bytesPass",bytesPass)

//     tpass, err := AesDecrypt(bytesPass, aeskey)
//     if err != nil {
//         fmt.Println(err)
//         return
//     }
//     fmt.Printf("解密后:%s\n", tpass)
// }

// ECB
// package main
// import (
//     "bytes"
//     "crypto/aes"
//     "crypto/cipher"
//     "errors"
// 	"encoding/base64"
// 	"fmt"
// )

// const sKey = "len16 secret key"

// //pkcs7Padding 填充
// func pkcs7Padding(data []byte, blockSize int) []byte {
//     //判断缺少几位长度。最少1，最多 blockSize
//     padding := blockSize - len(data)%blockSize
//     //补足位数。把切片[]byte{byte(padding)}复制padding个
//     padText := bytes.Repeat([]byte{byte(padding)}, padding)
//     return append(data, padText...)
// }

// //pkcs7UnPadding 填充的反向操作
// func pkcs7UnPadding(data []byte) ([]byte, error) {
//     length := len(data)
//     if length == 0 {
//         return nil, errors.New("加密字符串错误！")
//     }
//     //获取填充的个数
//     unPadding := int(data[length-1])
//     return data[:(length - unPadding)], nil
// }

// //AesEncrypt 加密
// func AesEncrypt(data []byte) ([]byte, error) {
//     key := []byte(sKey)
//     //创建加密实例
//     block, err := aes.NewCipher(key)
//     if err != nil {
//         return nil, err
//     }
//     //判断加密块的大小
//     blockSize := block.BlockSize()
//     //填充
//     encryptBytes := pkcs7Padding(data, blockSize)
//     //初始化加密数据接收切片
//     crypted := make([]byte, len(encryptBytes))
//     //使用cbc加密模式
//     blockMode := cipher.NewCBCEncrypter(block, key[:blockSize])
//     //执行加密
//     blockMode.CryptBlocks(crypted, encryptBytes)
//     return crypted, nil
// }

// //AesDecrypt 解密
// func AesDecrypt(data []byte) ([]byte, error) {
//     key := []byte(sKey)
//     //创建实例
//     block, err := aes.NewCipher(key)
//     if err != nil {
//         return nil, err
//     }
//     //获取块的大小
//     blockSize := block.BlockSize()
//     //使用cbc
//     blockMode := cipher.NewCBCDecrypter(block, key[:blockSize])
//     //初始化解密数据接收切片
//     crypted := make([]byte, len(data))
//     //执行解密
//     blockMode.CryptBlocks(crypted, data)
//     //去除填充
//     crypted, err = pkcs7UnPadding(crypted)
//     if err != nil {
//         return nil, err
//     }
//     return crypted, nil
// }

// func main (){
// 	s := []byte("mysqlpassword")
// 		ss, err := AesEncrypt(s)
// 		if err != nil {
// 			println(err)
// 		}
// 		mw := base64.StdEncoding.EncodeToString(ss)
// 		println("加密后: %s\n", mw)
	
// 		mwb, _ := base64.StdEncoding.DecodeString(mw)
// 		s, err = AesDecrypt(mwb)
// 		if err != nil {
// 			println(err)
// 		}
// 		ret := fmt.Sprintf("解密后: %s\n", s)
// 		println(ret)
// }


// package main

// import (
//     "crypto/cipher"
//     "crypto/aes"
// 	"errors"
// 	"bytes"
// 	"encoding/base64"
// )

// func AESEncodeStr(src, key string) (string, error) {
// 	block, err := aes.NewCipher([]byte(key))
// 	if err != nil {
// 	   return "", err
// 	}
// 	if src == "" {
// 	   return "", err
// 	}
// 	ecb := cipher.NewCBCEncrypter(block, []byte(key)[:block.BlockSize()])
// 	content := []byte(src)
// 	content = PKCS5Padding(content, block.BlockSize())
// 	crypted := make([]byte, len(content))
// 	if len(content)%ecb.BlockSize() != 0 {
// 	   return "", errors.New("error length")
// 	}
// 	ecb.CryptBlocks(crypted, content)
// 	data := base64.StdEncoding.EncodeToString(crypted)
// 	return data, nil
//  }
//  func AESDecodeStr(crypt, key string) (string, error) {
// 	crypted, err := base64.StdEncoding.DecodeString(crypt)
// 	if err != nil || len(crypted) == 0 {
// 	   return "", err
// 	}
// 	block, err := aes.NewCipher([]byte(key))
// 	if err != nil {
// 	   return "", err
// 	}
// 	ecb := cipher.NewCBCDecrypter(block, []byte(key)[:block.BlockSize()])
// 	decrypted := make([]byte, len(crypted))
 
// 	if len(crypted)%ecb.BlockSize() != 0 {
// 	   return "", errors.New("error length")
// 	}
 
// 	ecb.CryptBlocks(decrypted, crypted)
// 	return string(PKCS5Trimming(decrypted)), nil
//  }
//  func PKCS5Padding(ciphertext []byte, blockSize int) []byte {
// 	padding := blockSize - len(ciphertext)%blockSize
// 	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
// 	return append(ciphertext, padtext...)
//  }
 
//  func PKCS5Trimming(encrypt []byte) []byte {
// 	padding := encrypt[len(encrypt)-1]
// 	return encrypt[:len(encrypt)-int(padding)]
//  }

//  func main(){
// 	r,err := AESEncodeStr( "mysqlpassword", "91e99dbce3ed82adf3795d87129b6aa2")
// 	println(r,err)
//  }

package main
import (
	"bytes"
	"crypto/aes"
	"fmt"
	 "encoding/hex"
	// "testing"
)

//ECB模式解密
func ECBDecrypt(crypted, key []byte) ([]byte, error) {
	if !validKey(key) {
	
		return nil, fmt.Errorf("秘钥长度错误,当前传入长度为 %d",len(key))
	}
	if len(crypted) < 1 {
		return nil, fmt.Errorf("源数据长度不能为0")
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}
	if len(crypted)%block.BlockSize() != 0 {
		println("sadasd1")
		return nil, fmt.Errorf("源数据长度必须是 %d 的整数倍，当前长度为：%d",block.BlockSize(), len(crypted))
	}
	var dst []byte
	tmpData := make([]byte, block.BlockSize())

	for index := 0; index < len(crypted); index += block.BlockSize() {
		block.Decrypt(tmpData, crypted[index:index+block.BlockSize()])
		dst = append(dst, tmpData...)
	}
	dst, err = PKCS5UnPadding(dst)
	if err != nil {
		return nil, err
	}
	return dst, nil
}

//ECB模式加密
func ECBEncrypt(src, key []byte) ([]byte, error) {
	if !validKey(key) {
		println("sadasd1")
		return nil, fmt.Errorf("秘钥长度错误, 当前传入长度为 %d",len(key))
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		println("sadasd2")
		return nil, err
	}
	if len(src) < 1 {
		return nil, fmt.Errorf("源数据长度不能为0")
	}
	src = PKCS5Padding(src, block.BlockSize())
	if len(src)%block.BlockSize() != 0 {
		return nil, fmt.Errorf("源数据长度必须是 %d 的整数倍，当前长度为：%d",block.BlockSize(), len(src))
	}
	var dst []byte
	tmpData := make([]byte, block.BlockSize())
	for index := 0; index < len(src); index += block.BlockSize() {
		block.Encrypt(tmpData, src[index:index+block.BlockSize()])
		dst = append(dst, tmpData...)
	}
	return dst, nil
}

// PKCS5填充
func PKCS5Padding(ciphertext []byte, blockSize int) []byte {
	padding := blockSize - len(ciphertext)%blockSize
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(ciphertext, padtext...)
}

// 去除PKCS5填充
func PKCS5UnPadding(origData []byte) ([]byte, error) {
	length := len(origData)
	unpadding := int(origData[length-1])

	if length < unpadding {
		return nil, fmt.Errorf("invalid unpadding length")
	}
	return origData[:(length - unpadding)], nil
}

// 秘钥长度验证
func validKey(key []byte) bool {
	// k := len(key)
	// switch k {
	// default:
	// 	return false
	// case 16, 24, 32:
	// 	return true
	// }
	return true
}


func main(){
	srcData := "thing quit venture enough owner useless chest rapid comic reunion food garage key"
	key := []byte("5371a97bf39c7b40088894a3b6d57931")
	//测试加密
	encData ,err := ECBEncrypt([]byte(srcData),(key))
	if err != nil {
		println("err",err)
		return
	}
	
	println(hex.EncodeToString(encData))
	

	value,_ := hex.DecodeString("02cc7c3bdc3362e071444c4c3dab8dc98dd180987ec5623ba20ec81450c0afe5d389e4972e08e1e47ec59fc0714f782b85cf52c378a5b5a4fea021b6413650f7af7ffbd9e6a70d247b59cf8379bd986f")
	println(encData,value)
	//测试解密
	decData ,err := ECBDecrypt(encData,key)
	if err != nil {
		println(err)
		return
	}
	println(string(decData))
}