var express = require('express');
var app = express();
var ejs = require('ejs');
var passport = require("passport");
var github = require('octonode');
var GitHubStrategy = require('passport-github2').Strategy;
var qs = require('querystring');

var sha;

var server = app.listen(8080, function () {
var host = server.address().address;
var port = server.address().port;

app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/views'); //fichier html
app.use("/public", express.static(__dirname + '/public')); //fichiers statiques (css+js)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var GITHUB_CLIENT_ID = '2254bfe8fe6989830488';
var GITHUB_CLIENT_SECRET = '36d6eb32c47ba1dc9e0331397d7a165769730f2c';
var GITHUB_CALLBACK_URL = "http://127.0.0.1:8080/auth/github/callback";
 passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL,
    scope:["user","repo","write:org"]
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

  app.get('/', function(req, res) {
    res.render('CalendarMgr.ejs.html');
  });

//   app.get('/login', function(req, res){
//   res.render('login.ejs', { user: req.user });
// });

app.post('/login',
  passport.authenticate('github'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    client=github.client(req.user);

  client.get('/user', {}, function (err, status, body, headers) {
   //console.log(body); //json object
   });
    res.redirect('/');
  });

app.post('/createcourse', function(req,res){
	var body='';
	var post='';

	req.on('data', function(data){
		body+=data
	});

	req.on('end', function(){
		req.post=qs.parse(body);
    sha=setSHA(sha);
    ghrepo.updateContents('data/test.json', 'Modification avec passport', req.post, sha, function(err, data, headers) {
  console.log("error: " + err);
  console.log("data: " + data);
  console.log("headers:" + headers);
});; //path

	});
});

app.post('/createevent', function(req,res){
	var body='';
	var post='';

	req.on('data', function(data){
		body+=data
		console.log(body)
	});

	req.on('end', function(){
		req.post=qs.parse(body);
		console.log(req.post)
	});
});

function setSHA(a_sha) {
        sha = a_sha;
    }

  console.log('Server listening at http://%s:%s', host, port);
});