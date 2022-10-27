
// 什么是字节 https://tool.oschina.net/hexconvert/
// 1字节 = 8位   00000000  ～ 11111111    0～255
// 1k = 1024字节
// 1个汉字（utf8下） = 3字节 = 24位   00000000 00000000 00000000  ～ 11111111 11111111 11111111 
// 1个字节转化成十进制是255(因为一个字节8位，每个位都是1的时候，转成十进制是255)  0～255
// 1个字节转换成十六进制是ff  00000000  ～ 11111111    0～255  0xff


// 开辟2个字节长度 buffer是16进制的
const a = Buffer.alloc(3)  
// a.fill(1) // 填充所有
// console.log(a[0], a)

a.write("a")
console.log(a.toString(),a)
a.write("b",1)
console.log(a.toString(),a)


a.write("c",2)
console.log(a.toString(),a)


// console.log(a, Buffer.isEncoding('utf8'))


// tty
// var fs = require('fs');
// var buffer =  Buffer.from(1024);
// var readSize = fs.readSync(fs.openSync('/dev/ttys052', 'r'), buffer, 0, buffer.length);
// var chunk = buffer.toString('utf8', 0, readSize);

// console.log('INPUT: ' + chunk);



// //json to Buffer buffer to JSON
// const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0xff]);
// const json = JSON.stringify(buf);

// // 输出: {"type":"Buffer","data":[1,2,3,4,5]}
// console.log(json);

// const copy = JSON.parse(json, (key, value) => {
//   return value && value.type === 'Buffer' ?
//     Buffer.from(value.data) :
//     value;
// });

// console.log(copy.toString("hex"), copy.toString("base64"))
