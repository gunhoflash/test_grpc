var PROTO_PATH = __dirname + '/protos/helloworld.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var hello_proto = protoDescriptor.test.helloworld;

function sayHello(call, callback) {
    let req = call.request;
    let _int64 = req._int32 + 1;
    let _double = req._float + 1;
    let _string = 'hi ' + req._string;

    if (req._bool) {
        _int64 *= -1;
        _double *= -1;
    }

    console.log(`sayHello`, req);

    callback(null, {
        _int64: _int64,
        _double: _double,
        _string: _string
    });
}

function main() {
    var Server = new grpc.Server();
    Server.addService(hello_proto.Greeter.service, {
        sayHello: sayHello
    });
    Server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    Server.start();
}

main();