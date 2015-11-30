'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var Request = require('../api/request/request.model');
var validateJwt = expressJwt({ secret: config.secrets.session });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 401
 */
function isAuthenticated() {
  return compose()

    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }

      validateJwt(req, res, next);
    })

    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id, function(err, user) {
        if (err) return next(err);
        if (!user) return res.sendStatus(401);

        req.user = user;
        next();
      });
    });
}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 401
 */
function isAuthorized() {
  return compose()
    .use(isAuthenticated())
    .use(attachRequest)
    .use(function(req, res, next) {
      if (meetsRequirements(req.user.role, 'adminMdph')) {
        next();
      } else if (isRequestOwner(req.user, req.request)) {
        next();
      } else {
        res.sendStatus(403);
      }
    });
}

function attachRequest(req, res, next) {
  if (req.params.shortId) {
    Request.findOne({
      shortId: req.params.shortId
    }).exec(function(err, request) {
      if (err || !request) { return res.sendStatus(404); }

      req.request = request;
      next();
    });
  } else {
    next();
  }
}

function isRequestOwner(user, request) {
  if (!request || !user) {
    return false;
  }

  return String(user._id) !== String(request.user);
}

function meetsRequirements(role, roleRequired) {
  return config.userRoles.indexOf(role) >= config.userRoles.indexOf(roleRequired);
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Le role est obligatoire.');

  return function(req, res, next) {
    if (meetsRequirements(req.user.role, roleRequired)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.json(404, { message: 'Une erreur est survenue, veuillez réessayer.'});
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.isAuthorized = isAuthorized;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
