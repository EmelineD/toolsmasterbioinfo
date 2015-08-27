var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    qs = require('qs'),
    github = require('octonode'),
    qs = require('querystring');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

var client=null;
var ghrepo =null;
var state;

var everyauth = require('everyauth')
  , connect = require('connect');

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    var sha;
    if (uri=='/login') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
        parsedBody = qs.parse(body);


    //     var auth_url = github.auth.config({
    //         id: '2254bfe8fe6989830488',
    //         secret: '36d6eb32c47ba1dc9e0331397d7a165769730f2c'
    //         }).login(['repo']);
    // //    console.log(auth_url);
    //     state = auth_url.match(/&state=([0-9a-z]{32})/i);

    //     client = github.client();
    //     // console.log(client);


        everyauth.github
          .appId('YOUR CLIENT ID HERE')
          .appSecret('YOUR CLIENT SECRET HERE')
          .findOrCreateUser( function (session, accessToken, accessTokenExtra, githubUserMetadata) {
            // find or create user logic goes here
          })
          .redirectPath('/');

            res.writeHead(302, {'Content-Type': 'text/plain', 'Location': auth_url, 'Access-Control-Allow-Credentials': true  })
            res.end('Redirecting to ' + auth_url);
        });
    }
    // Callback url from github login
    else if (uri=='/auth/callback') {
        github.auth.login(qs.parse(uri.query).code,function(err,token){
            res.writeHead(200, {'Content-Type': 'text/plain'});
            console.log(token);
            res.end(token);
        });
        var values = qs.parse(uri.query);
        // Check against CSRF attacks
        if (!state || state[1] != values.state) {

          res.writeHead(301, {Location: '/CalendarMgr.html?status=1', 'Access-Control-Allow-Credentials': true });
          res.end('');
        } 
        else {
          github.auth.login(values.code, function (err, token) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(token);
          });
        }
    }

    else if(uri=='/createcourse'){
        if (req.method === 'POST') {

        var body='';
        var post='';

        req.on('data', function(data){
            body+=data
        });

        console.log(body);

        req.on('end', function(){
            req.post=qs.parse(body);
            
        });

        }
        else{
            console.log("Rien");
        }
    }
    
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

    function setSHA(a_sha) {
        sha = a_sha;
    }
}).listen(8080);
