'use strict';

import passport from 'passport';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

import mongoose from 'mongoose';
import User from '../api/user/user.model';
import Request from '../api/request/request.model';
import Profile from '../api/profile/profile.model';

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

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 401
 */
function isAuthorized() {
  return compose()
    .use(isAuthenticated())
    .use(attachProfile)
    .use(attachRequest)
    .use(function(req, res, next) {
      if (canAccessResource(req.user, req.profile) || canAccessResource(req.user, req.request)) {
        next();
      } else {
        res.sendStatus(403);
      }
    });
}

/**
 * Verifies that the user is trying to create/list profiles for himself,
 * Attaches the user object to the request if authenticated
 * Otherwise returns 401
 */
function canAccessProfile() {
  return compose()
    .use(isAuthenticated())
    .use(function(req, res, next) {
      if (meetsRequirements(req.user.role, 'adminMdph') || req.user._id.equals(req.params.userId)) {
        next();
      } else {
        res.sendStatus(403);
      }
    });
}

function canAccessResource(user, resource) {
  if (!resource || !user) {
    return false;
  }

  if (meetsRequirements(user.role, 'adminMdph')) {
    return true;
  }

  if (!resource.user._id) {
    return String(user._id) === String(resource.user);
  } else {
    return user._id.equals(resource.user._id);
  }
}

function attachProfile(req, res, next) {
  if (req.params.profileId) {
    Profile
      .findById(req.params.profileId)
      .populate('user')
      .exec(function(err, profile) {
        if (!profile) {
          return res.sendStatus(404);
        }

        if (err) {
          req.log.error(err);
          return res.status(500).send(err);
        }

        req.profile = profile;
        next();
      });
  } else {
    next();
  }
}

function attachRequest(req, res, next) {
  if (req.params.shortId) {
    Request
      .findOne({
        shortId: req.params.shortId
      })
      .populate('user evaluator')
      .exec(function(err, request) {
        if (!request) {
          return res.sendStatus(404);
        }

        if (err) {
          req.log.error(err);
          return res.status(500).send(err);
        }

        req.request = request;
        next();
      });
  } else {
    next();
  }
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
  return jwt.sign({ _id: id, role: role }, config.secrets.session, { expiresIn: 60 * 60 * 5 });
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

exports.canAccessProfile = canAccessProfile;
exports.canAccessResource = canAccessResource;
exports.isAuthenticated = isAuthenticated;
exports.isAuthorized = isAuthorized;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.meetsRequirements = meetsRequirements;
