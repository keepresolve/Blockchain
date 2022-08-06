

const  fs = require("fs")


// /data 
// /data, req , res  
// nuxt 
// const nuxt vue-server-render  


// asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
//     return { a:{}}
// },
// data(){
//     return {
//         a:{}  
//     }
// }
// fetch(){
     
// }

// create(){
//     window  
// }
// beforeCreate() {
    
// },
// <html>
    
  
{/* <div id="root"><div></div></div>
</html> */}

const  data=  fs.readFileSync("./vue.html",'utf-8')

console.log(data)