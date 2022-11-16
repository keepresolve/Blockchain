package main
 
import (
	"flag"
	"log"
	"net/http"
)

var (
	listen = flag.String("listen", ":8087", "listen address")
	dir    = flag.String("dir", ".", "files directory to serve")
)

func main() {
	flag.Parse()
	log.Printf("listening on %q...", *listen)
	err := http.ListenAndServe(*listen, http.FileServer(http.Dir(*dir)))
	log.Fatalln(err)
}