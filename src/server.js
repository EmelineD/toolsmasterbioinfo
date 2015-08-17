var http = require('http');
var fs = require('fs');
var GitHubApi = require("github");

var github = github.authenticate({
    type: "basic",
    username: "mikedeboertest",
    password: "test1324"
});

// Chargement du fichier index.html affiché au client

var server = http.createServer(function(req, res) {
	fs.readFile('../CalendarForm.html', 'utf-8', function(error, content) {
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(content);
	});
});

// Chargement de socket.io

var io = require('socket.io').listen(server);

// Quand on client se connecte, on le note dans la console

io.sockets.on('connection', function (socket) {

	console.log(github.username+'est connecté !');
});

server.listen(8080);