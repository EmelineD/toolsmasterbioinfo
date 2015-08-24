var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

// Chargement du fichier index.html affiché au client

var server = http.createServer(function(req, res) {
	fs.readFile('../CalendarForm.html', 'utf-8', function(error, content) {
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(content);
	});
});

// http.createServer(function(req, res) {
//     var uri = url.parse(req.url).pathname;
//     var filename = path.join(process.cwd(), uri);
//     path.exists(filename, function(exists) {
//         if(!exists) {
//             console.log("not exists: " + filename);
//             res.writeHead(200, {'Content-Type': 'text/plain'});
//             res.write('404 Not Found\n');
//             res.end();
//         }
//         var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
//         res.writeHead(200, mimeType);

//         var fileStream = fs.createReadStream(filename);
//         fileStream.pipe(res);
//            }); //end path.exists
// }).listen(1337);

// Chargement de socket.io

// var io = require('socket.io').listen(server);

// Quand on client se connecte, on le note dans la console

// io.sockets.on('connection', function (socket) {

// 	console.log(github.username+'est connecté !');
// });

server.listen(8080);

