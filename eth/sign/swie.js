// const msgHexToText = (hex) => {
//     try {
//       const stripped = hex
//       const buff = Buffer.from(stripped, 'hex');
//       return buff.length === 32 ? hex : buff.toString('utf8');
//     } catch (e) {
//       log.error(e);
//       return hex;
//     }
//   };


//   console.log(msgHexToText(Buffer.from("hello").toString("hex")))
console.log(Buffer.from(`aaaaaa
aaaaa
aaaa`).toString("hex"))