const express = require("express")
const bodyParser = require('body-parser');
const {hello_proto  } = require('./proto/index')
const grpc = require('@grpc/grpc-js')
const router = express.Router();



const app = express()
app.use(bodyParser.json({ limit: 'Mixed' }));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(router);
router.use(express.static(__dirname + '/static'));



var client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure())


router.get("/hello", (req,res)=>{
    client.sayHello(req.query, function(err, response) {
        if (err) {
            console.error('Error: ', err)
            res.end(500,err)
        } else {
            console.log(response.message)
            res.end(response.message)
        }
    })
})
app.listen("3000",()=>{
    console.log("listen 3000")
})