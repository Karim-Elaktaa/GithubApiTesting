var http = require("http");
var utils = require("./utils");

// create a server
http.createServer(function(req, res) {

    res.end("pppppppp!");
}).listen(utils.PORT, utils.IP);
