const sources =  Buffer.from([1, 2])  // 16进制 01 02    10进制 1 2  二进制 00000001  00000010

// 00000001  00000010  ~  000000 010000 0010   ~ 00000000 00010000 00001000  ~ 0  16  2 ~ A Q I

console.log(sources)
console.log(sources.toString("base64"))


const sources1 =  Buffer.from([0xff,0xee,0xf])

// 111111  11 11101110  11111000
// 00000001  00000010  ~  000000 010000 0010   ~ 00000000 00010000 00001000  ~ 0  16  2 ~ A Q I

console.log(sources1)
console.log(sources1.toString("base64"))