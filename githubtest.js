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

var passport= require('passport')
  , GitHubStrategy = require('passport-github2').Strategy;

var GITHUB_CLIENT_ID = '2254bfe8fe6989830488';
var GITHUB_CLIENT_SECRET = '36d6eb32c47ba1dc9e0331397d7a165769730f2c';

 passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8080/auth/github/callback",
    scope:["user","repo"]
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null,accessToken);
    });
  }
));


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

        passport.authenticate('github',
        function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/users/' + req.user.username);
        }
    });
    }

    else if(uri=='/auth/github'){
        passport.authenticate('github');    
        function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });   
    }

    // Callback url from github login
    else if (uri=='/auth/github/callback') {

          passport.authenticate('github', { failureRedirect: '/login' }),
        function(req, res) {
            var client=github.client(req.user);

    client.get('/user', {}, function (err, status, body, headers) {
     console.log(body); //json object
     });
    res.redirect('/');
  });

        // passport.authenticate('github', { failureRedirect: '/login' }),
        // function(req, res) {
        // // Successful authentication, redirect home.
        //     res.redirect('/');
        // }
        // github.auth.login(qs.parse(uri.query).code,function(err,token){
        //     res.writeHead(200, {'Content-Type': 'text/plain'});
        //     console.log(token);
        //     res.end(token);
        // });
        // var values = qs.parse(uri.query);
        // // Check against CSRF attacks
        // if (!state || state[1] != values.state) {

        //   res.writeHead(301, {Location: '/CalendarMgr.html?status=1', 'Access-Control-Allow-Credentials': true });
        //   res.end('');
        // } 
        // else {
        //   github.auth.login(values.code, function (err, token) {
        //     res.writeHead(200, {'Content-Type': 'text/plain'});
        //     res.end(token);
        //   });
        // }
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
