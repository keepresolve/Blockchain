const grpc = require('@grpc/grpc-js')
const grpcProto = require('./proto/index')


 function sayHello(call, callback) {
    setTimeout(()=>{
        callback(null, { message:  call.request.message })
    }, 2000)
   
}

function main() {
    var server = new grpc.Server()
    server.addService(grpcProto.hello_proto.Greeter.service, { sayHello: sayHello })



    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start()
        console.log('grpc server started, 50051')
    })
}

main()