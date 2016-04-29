'use strict';

import _ from 'lodash';
import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
import * as MailActions from '../send-mail/send-mail-actions';

import Profile from '../profile/profile.model';

import Promise from 'bluebird';

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({
    mdph: req.user.mdph
  }, '-salt -hashedPassword', function(err, users) {
    if (err) return handleError(req, res, err);
    res.json(users);
  });
};

function saveUserAndSendConfirmation(req, res, user, mdph) {
  user.newMailToken = shortid.generate();
  return user
    .save()
    .then(() => {
      return Profile.create({user: user._id});
    })
    .then((profile) => {
      const confirmationUrl = `http://${req.headers.host}/mdph/${mdph}/confirmer_mail/${user._id}/${user.newMailToken}`;
      MailActions.sendConfirmationMail(user.email, confirmationUrl);

      const token = jwt.sign({_id: user._id }, config.secrets.session, { expiresIn: 60 * 60 * 5 });
      res.status(201);
      return res.json({ token: token, id: user._id, profile: profile._id });
    })
    .catch(err => {
      return validationError(res, err);
    });
}

/**
 * Creates a new user
 */
exports.create = function(req, res) {
  var newUser = new User(_.omit(req.body, 'mdph'));
  newUser.role = 'user';
  newUser.provider = 'local';
  return saveUserAndSendConfirmation(req, res, newUser, req.body.mdph)
    .then(result => {
      return result;
    });
};

/**
 * Creates a new agent
 */
exports.createAgent = function(req, res) {
  var newUser = new User(req.body);
  newUser.role = 'agent';
  newUser.provider = 'local';
  return saveUserAndSendConfirmation(req, res, newUser, req.body.mdph)
    .then(result => {
      return result;
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User
    .findById(userId)
    .populate('mdph.zipcode')
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return res.sendStatus(401);

      res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return handleError(req, res, err);
    if (user) {
      user.remove();
    }

    return res.sendStatus(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User
    .findById(userId)
    .select('+hashedPassword +salt')
    .exec(function(err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });
};

/**
 * Change a user's personal information
 */
exports.changeInfo = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (req.user.role === 'admin' || req.user.role === 'adminMdph') {
      user.set('email', req.body.email);
    }

    user
      .set('name', req.body.name)
      .set('isMultiProfiles', req.body.isMultiProfiles)
      .save(function(err, result) {
        if (err) return validationError(res, err);

        res.json(result);
      });
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword') // don't ever give out the password or salt)
  .populate('mdph')
  .exec(function(err, user) {
    if (err) return next(err);
    if (!user) return res.json(401);

    res.json(user.profile);
  });
};

/**
 * Search by email
 */
exports.search = function(req, res, next) {
  var email = req.query.email;

  User.findOne({
    email: email
  }, '-salt -hashedPassword') // don't ever give out the password or salt)
  .exec(function(err, user) {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);

    res.json(user.profile);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res) {
  res.redirect('/');
};

/**
 * Post to check if email exists
 */
exports.generateTokenForPassword = function(req, res, next) {
  let email = req.body.email;
  let mdph = req.body.mdph;

  User.findOne({
    email: email
  }, function(err, user) {
    if (err) return next(err);
    if (!user) return res.sendStatus(200);
    user.newPasswordToken = shortid.generate();
    user.save(function(err) {
      if (err) return validationError(res, err);
      let confirmationUrl = 'http://' + req.headers.host + '/mdph/' + mdph + '/nouveau_mot_de_passe/' + user._id + '/' + user.newPasswordToken;
      MailActions.sendMailRenewPassword(user.email, confirmationUrl);
      res.sendStatus(200);
    });
  });
};

exports.resetPassword = function(req, res) {
  User.findById(req.params.id, '+newPasswordToken', function(err, user) {
    if (err) return handleError(req, res, err);
    if (!user) return res.sendStatus(404);
    if (!req.params.secret) return res.sendStatus(400);
    if (req.params.secret !== user.newPasswordToken) return res.sendStatus(400);
    user.password = req.body.newPassword;
    user.newPasswordToken = '';
    user.save(function(err) {
      if (err) return validationError(res, err);
      return res.sendStatus(200);
    });
  });
};

exports.confirmMail = function(req, res) {
  User.findById(req.params.id, '+newMailToken', function(err, user) {
    if (err) return handleError(req, res, err);
    if (!user) return res.sendStatus(404);
    if (!req.params.secret) return res.sendStatus(400);
    if (req.params.secret !== user.newMailToken) return res.sendStatus(400);
    if (user.unconfirmed === false) return res.sendStatus(304);
    user.unconfirmed = false;
    user.save(function(err) {
      if (err) return validationError(res, err);
      return res.sendStatus(200);
    });
  });
};

exports.resendConfirmation = function(req, res) {
  User.findById(req.params.id, '+newMailToken', function(err, user) {
    if (err) return handleError(req, res, err);
    if (!user) return res.sendStatus(404);

    var token;
    if (!user.newMailToken) {
      token = shortid.generate();
      user.newMailToken = token;
      user.save();
    }

    var confirmationUrl = 'http://' + req.headers.host + '/mdph/' + req.body.mdph + '/confirmer_mail/' + user._id + '/' + user.newMailToken;
    MailActions.sendConfirmationMail(user.email, confirmationUrl);
    res.sendStatus(200);
  });
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
