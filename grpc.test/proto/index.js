const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader')
const path = require("path")

const PROTO_PATH = path.join(__dirname, "./moudle/hello.proto")
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true })
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const hello_proto = protoDescriptor.hello
module.exports = {
    hello_proto
}

