var express = require('express');
var app = express();
var passport = require("passport")
var GitHubStrategy = require('passport-github2').Strategy;
var github = require('octonode');
var ejs=require("ejs");

var server = app.listen(8080, function () {
var host = server.address().address;
var port = server.address().port;

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



  app.get('/', function(req, res) {
    res.render('CalendarMgr.ejs', { user: req.user });
  });

  app.get('/login', function(req, res){
  res.render('login.ejs', { user: req.user });
});

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
    var client=github.client(req.user);

  client.get('/user', {}, function (err, status, body, headers) {
   console.log(body); //json object
   });
    res.redirect('/');
  });


  console.log('Example app listening at http://%s:%s', host, port);
});
