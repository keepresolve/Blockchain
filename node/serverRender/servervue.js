var express = require("express"); // https  createServer
const fs = require("fs"); //  stream  path
const path = require("path");
const Vue = require("vue");


const renderer = require("vue-server-renderer").createRenderer();
// const axios = require("axios")

// process .env
//__dirname
//golbal  == window

// https 包
var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(async function (req, res) {
   
  const state = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list: [
          {
            key: "1",
            value: "2",
          },
          {
            key: "1",
            value: "2",
          },
          {
            key: "1",
            value: "2",
          },
        ],
        data: "asdasda",
      });
    }, 1000);
  });

  const vm = new Vue({
    data() {
      return state;
    },
    render(h) {
      return h(
        "ul",
        this.list.map((item) => h("li", {}, `key:${item.key}value:${item.value}`))
      );
    },
    created() {
      console.log(this);
    },
    mounted() {
      console.log(this);
    },
  });

  renderer.renderToString(vm, (err, html) => {
    res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Vue SSR Example</title>
                </head>
                <body>
                    <div id="app">${html}</div>
                </body>
                </html>
        `);
  });
});

app.listen(3000, function () {
  console.log("listening 3000");
});
