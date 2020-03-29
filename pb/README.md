complie `.proto` to `.js`:
```
protoc --proto_path=../protos/ --js_out=./ helloworld.proto
```