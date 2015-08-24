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
var ghrepo         = client.repo('EmelineD/toolsmasterbioinfo');
var ghorg          = client.org('flatiron');
var ghissue        = client.issue('EmelineD/toolsmasterbioinfo', 37);
var ghmilestone    = client.milestone('EmelineD/toolsmasterbioinfo', 37);
var ghlabel        = client.label('EmelineD/toolsmasterbioinfo', 'todo');
var ghpr           = client.pr('EmelineD/toolsmasterbioinfo', 37);
var ghgist         = client.gist();
var ghteam         = client.team(37);
var ghsearch = client.search();

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
    // Callback url from github login
    else if (uri=='/auth') {
        var values = qs.parse(uri.query);
    // Check against CSRF attacks
        if (!state || state[1] != values.state) {
            res.writeHead(403, {'Content-Type': 'text/plain'});
            console.log(ghuser.client.token.username);
            ghrepo.readme(function(err, data) {
                // for (var i in data){
                //     console.log(data[i]);
                // }
                console.log(data);
            });
            res.end('Authentification reussie');
        }
        else {
            github.auth.login(values.code, function (err, token) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(token);
            });
        }
    }
    // else if(uri=='/testadd'){

    // }
    else{
        var filename = path.join(process.cwd(), uri);
        path.exists(filename, function(exists) {
        if(!exists) {
            console.log("not exists: " + filename);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('404 Not Found\n');
            res.end();
            return;
        }
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        res.writeHead(200, {'Content-Type':mimeType});

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);
        }) //end path.exists
    }
}).listen(8000,function(){console.log("listen(8000)")});
