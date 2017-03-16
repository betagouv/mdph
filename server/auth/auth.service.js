'use strict';

import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

import User from '../api/user/user.model';

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
      User
        .findById(req.user._id)
        .populate('mdph')
        .exec(function(err, user) {
          if (err) {
            return next(err);
          }

          if (!user) {
            return res.sendStatus(401);
          }

          req.user = user;
          next();
        });
    });
}

function canAccessProfileList() {
  return compose()
    .use(isAuthenticated())
    .use(function(req, res, next) {
      if (req.user._id.equals(req.params.userId)) {
        next();
      } else {
        res.sendStatus(403);
      }
    });
}

function canAccessProfile() {
  return compose()
    .use(isAuthenticated())
    .use(function(req, res, next) {
      if (req.user && req.profile && req.user._id.equals(req.profile.user)) {
        next();
      } else {
        res.sendStatus(403);
      }
    });
}

function isAgent() {
  return compose()
    .use(isAuthenticated())
    .use(function(req, res, next) {
      if (meetsRequirements(req.user.role, 'admin')) {
        return next();
      }

      if (meetsRequirements(req.user.role, 'adminMdph') && req.user.mdph._id.equals(req.mdph._id)) {
        return next();
      }

      return res.sendStatus(401);
    });
}

function isAgentOrOwner() {
  return compose()
    .use(isAuthenticated())
    .use(function(req, res, next) {
      if (meetsRequirements(req.user.role, 'admin')) {
        return next();
      }

      if (meetsRequirements(req.user.role, 'adminMdph') && req.user.mdph.zipcode === req.request.mdph) {
        return next();
      }

      if (req.user._id.equals(req.request.user._id)) {
        return next();
      }

      return res.sendStatus(401);
    });
}

function meetsRequirements(role, roleRequired) {
  return config.userRoles.indexOf(role) >= config.userRoles.indexOf(roleRequired);
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Le role est obligatoire.');

  return compose()
    .use(isAuthenticated())
    .use(function(req, res, next) {
      if (meetsRequirements(req.user.role, roleRequired)) {
        next();
      } else {
        res.sendStatus(403);
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
  return jwt.sign({ _id: id, role: role }, config.secrets.session, { expiresIn: 60 * 60 * 24 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('Une erreur est survenue, veuillez réessayer.');
  }

  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}

exports.canAccessProfileList = canAccessProfileList;
exports.canAccessProfile = canAccessProfile;
exports.isAgent = isAgent;
exports.isAgentOrOwner = isAgentOrOwner;
exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.meetsRequirements = meetsRequirements;
