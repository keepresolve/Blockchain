
const  fs = require("fs")
const path = require("path")
console.log(__dirname)
const state = {
    keys:"123123",
    data:"asdasda"
}
let  data=  fs.readFileSync("./serverRender/art-template.html",'utf-8')
Object.keys(state).forEach(key=>{
    data = data.replace(`{{${key}}}`, state[key])
})

console.log(data)

