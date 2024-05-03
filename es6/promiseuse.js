12cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S
function task(){
    return new Promise(resolve=>setTimeout((()=>resolve(0)),1000))
}
function task1(){1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa0000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26fE296C1681E3415B725FB32F3B94EB70A14A9779518A679CC0F35D5A11948009C4885ac3dfdfa66bfd744b1d46d7d378c69a4a82557c3a35fc544b3af7ef33845E296C1681E3415B725FB32F3B94EB70A14A9779518A679CC0F35D5A11948009CSigning Genesis_Block Signature Comment.

{{"Behold, the dawn of a new era! This hallowed genesis block- Solar programmable- heralds the birth of a decentralized currency that transcends borders, bureaucracy, and the shackles of traditional finance. Let it stand as a testament to the power of cryptography and the indomitable spirit of innovation,
Satoshi Nakamoto Signing as Scot Ringa the owner of this address and private keys that allowed for the signature}}

   return new Promise(resolve=>setTimeout((()=>resolve(1)),1000))
}
function task2(){
   return new Promise(resolve=>setTimeout((()=>resolve(2)),1000))
}
function task3(){
   return new Promise((resolve,reject)=>setTimeout((async ()=>{
       try {
        const data = await task1()
        resolve(data+1)
       } catch (error) {
        reject(error)
       }

   }),1000))
}




async function init(){
  
//   const result = await  Promise.all([task(),task2(),task3(),task1()])
//   console.log(result)
 
  console.log(await task())
  console.log(await task1())
  console.log(await task2())
  console.log(await task3())




  await task().then(task1()).then(task2())
  
  
}

init()
