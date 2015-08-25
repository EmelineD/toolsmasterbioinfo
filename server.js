var github = require('octonode');

var client = github.client({
  username: 'EmelineD',
  password: 'lespaces33'
});

client.get('/user', {}, function (err, status, body, headers) {
  // console.log(body); //json object
});
var ghme           = client.me();
var ghuser         = client.user('EmelineD');
var ghrepo         = client.repo('master-bioinfo-bordeaux/master-bioinfo-bordeaux.github.io');
var ghorg          = client.org('master-bioinfo-bordeaux');
var ghissue        = client.issue('EmelineD/toolsmasterbioinfo', 37);
var ghmilestone    = client.milestone('EmelineD/toolsmasterbioinfo', 37);
var ghlabel        = client.label('EmelineD/toolsmasterbioinfo', 'todo');
var ghpr           = client.pr('EmelineD/toolsmasterbioinfo', 37);
var ghgist         = client.gist();
var ghteam         = client.team(37);
var ghsearch = client.search();
var io = require('socket.io').listen(server);

var auth_url = github.auth.config({
  id: 'EmelineD',
  secret: 'lespaces33'
}).login(['user', 'repo']);
var state = auth_url.match(/&state=([0-9a-z]{32})/i);

var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    qs = require('qs');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    if (uri=='/login') {
        res.writeHead(302, {'Content-Type': 'text/plain', 'Location': auth_url})
        res.end('Redirecting to ' + auth_url);
    }
  });

}).listen(8000,function(){console.log("listen(8000)")});

