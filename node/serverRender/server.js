var express = require("express"); // https  createServer
const fs = require("fs"); //  stream  path
const path = require("path");
// const axios = require("axios")

// process .env
//__dirname
//golbal  == window

// https 包
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(async function (req,res) {
  const state = await new Promise((resolve) => {
    setInterval(() => {
      resolve({
        keys: "123123",
        data: "asdasda",
      });
    }, 1000);
  });

  let data = fs.readFileSync(path.resolve(__dirname, "./art-template.html"), "utf-8");
  Object.keys(state).forEach((key) => {
    data = data.replace(`{{${key}}}`, state[key]);
  });
  res.end(data,   "utf-8")  // mine Type  
});

app.listen(3000,function(){
    console.log("listening 3000")
});
