'use strict';

var express = require('express');
var app = express();

// marker for `grunt-express` to inject static folder/contents
app.use(function staticsPlaceholder(req, res, next) {
  return next();
});

var Authentication = require('./authentication');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(cookieParser());
app.use(session({
  secret: 'i am not telling you',
  resave: true,
  saveUninitialized: true
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// setup passport authentication
app.use(passport.initialize());
app.use(passport.session());

passport.use(Authentication.localStrategy);
passport.serializeUser(Authentication.serializeUser);
passport.deserializeUser(Authentication.deserializeUser);

app.post('/login', Authentication.login);
app.get('/logout', Authentication.logout);

app.get('/user', Authentication.ensureAuthenticated, function(req, res) {
  return res.json(req.session.user);
});

// mock get data routes
app.get('/hello/:who', Authentication.ensureAuthenticated, function(req, res) {
  return res.json({hello: req.params.who});
});

module.exports = app;
