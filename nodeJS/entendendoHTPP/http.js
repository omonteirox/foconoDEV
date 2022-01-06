let http = require("http")

http.createServer(function(req,res){
    res.end("Salve salve yodinha")
}).listen(8080)
console.log("Running server");
