'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/users');

module.exports = {
  localStrategy: new LocalStrategy(
    function(username, password, done) {
      var user = User.findByUsername(username);

      if(!user || (user.password !== password)) {
        done(null, false, { message: 'Incorrect username or password.' });
      } else {
        return done(null, user);
      }
    }
  ),

  serializeUser: function(user, done) {
    done(null, user.id);
  },

  deserializeUser: function(id, done) {
    var user = User.findById(id);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  },

  login: function(req, res, next) {
    return passport.authenticate('local', function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400, {message: 'Bad username or password'});
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }

        res.status(200).json(user);
      });
    })(req, res, next);
  },

  logout: function(req, res) {
    req.logout();
    return res.status(200);
  },

  // NOTE: Need to protect all API calls (other than login/logout) with this check
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(401);
    }
  },

  csrf: function(req) {
    var token = (req.body && req.body._csrf) ||
      (req.query && req.query._csrf) ||
      (req.headers['x-csrf-token']) ||
      (req.headers['x-xsrf-token']);
    return token;
  }
};
