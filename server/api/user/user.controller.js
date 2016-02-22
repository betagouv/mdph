'use strict';

var _ = require('lodash');
var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var shortid = require('shortid');
var Mailer = require('../send-mail/send-mail.controller');
var MailActions = require('../send-mail/send-mail-actions');

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

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.unconfirmed = true;
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);

    user.newMailToken = shortid.generate();
    user.save(function(err) {
      if (err) return validationError(res, err);
      const confirmationUrl = 'http://' + req.headers.host + '/confirmer_mail/' + user._id + '/' + user.newMailToken;
      MailActions.sendConfirmationMail(user.email, confirmationUrl);
    });

    const token = jwt.sign({_id: user._id }, config.secrets.session, { expiresIn: 60 * 60 * 5 });
    res.json({ token: token, id: user._id });
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
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function(err, user) {
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
exports.changeInfo = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (req.user.role === 'admin' || req.user.role === 'adminMdph') {
      user.set('email', req.body.email);
    }

    user
      .set('name', req.body.name)
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
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

/**
 * Post to check if email exists
 */
exports.generateTokenForPassword = function(req, res, next) {
  var email = req.body.email;
  User.findOne({
    email: email
  }, function(err, user) {
    if (err) return next(err);
    if (!user) return res.sendStatus(200);
    var newPasswordToken = shortid.generate();
    user.newPasswordToken = newPasswordToken;
    user.save(function(err) {
      if (err) return validationError(res, err);
      var confirmationUrl = 'http://' + req.headers.host + '/nouveau_mot_de_passe/' + user._id + '/' + user.newPasswordToken;
      Mailer.sendMail(
        user.email,
        'Nouveau mot de passe',
        'Veuillez cliquer ici pour continuer votre changement de mot de passe :<br>' + confirmationUrl
      );
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
    } else {
      token = user.newMailToken;
    }

    var confirmationUrl = 'http://' + req.headers.host + '/confirmer_mail/' + user._id + '/' + user.newMailToken;
    Mailer.sendMail(
      user.email,
      'Validation de votre adresse',
      'Veuillez cliquer ici pour confirmer votre adresse :<br>' + confirmationUrl
    );
    res.sendStatus(200);
  });
};

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
