var github = require('octonode');
var client = github.client('someaccesstoken');

client.get('/user', {}, function (err, status, body, headers) {
  console.log(body); //json object
});
var ghme           = client.me();
var ghuser         = client.user('pksunkara');
var ghrepo         = client.repo('pksunkara/hub');
var ghorg          = client.org('flatiron');
var ghissue        = client.issue('pksunkara/hub', 37);
var ghmilestone    = client.milestone('pksunkara/hub', 37);
var ghlabel        = client.label('pksunkara/hub', 'todo');
var ghpr           = client.pr('pksunkara/hub', 37);
var ghgist         = client.gist();
var ghteam         = client.team(37);
var ghnotification = client.notification(37);
var ghsearch = client.search();

var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
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

    }); //end path.exists
}).listen(8000,function(){console.log("listen(8000)")});
