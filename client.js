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

function main() {
    var client = new hello_proto.Greeter('localhost:50051',
        grpc.credentials.createInsecure());
    var _string;
    if (process.argv.length >= 3) {
        _string = process.argv[2];
    } else {
        _string = 'world';
    }
    client.sayHello({
        _int32: 3,
        _float: 3.14,
        _bool: true,
        _string: _string
    }, function (err, response) {
        console.log('Greeting:', response);
    });
}

main();
