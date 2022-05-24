
function task(){
    return new Promise(resolve=>setTimeout((()=>resolve(0)),1000))
}
function task1(){
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