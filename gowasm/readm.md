
export GOOS=js

export GOARCH=wasm

export CGO_ENABLED=0


go build -o lib.wasm lib.go


export GOOS=mac

export GOARCH=amd64

sudo go run server.go




https://www.likecs.com/show-719355.html#sc=1326


go build -o test.wasm test.go



https://www.vugu.org/doc/start