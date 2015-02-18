'use strict';

var Mailjet = require('../../mailjet/mailjet');
var Mdph = require('../mdph/mdph.model');
var Partenaire = require('../partenaire/partenaire.model');

var Config;
try {
  Config = require('../../config/local.env');
} catch (ex) {
  Config = require('../../config/local.env.sample');
}

var mailjet = new Mailjet(Config.API_KEY, Config.SECRET_KEY);

/**
 * Send answers by mail
 */
exports.sendMail = function(html, mailUser) {
  return mailjet.sendContent(
    mailUser,
    'Récapitulatif de votre demande à la MDPH',
    html,
    true,
    null
  );
};

exports.sendConfirmation = function(req, res, next) {
  if (!req.body.html) {
    return res.status(400).send('No html given');
  }
  if (req.body.partenaire){
    Partenaire.findOne({email: req.body.partenaire}, function(error, result){
      if(error){
        return handleError(res, error);
      }
      else {
        if(!result){
          var partenaire = new Partenaire({email: req.body.partenaire.email});
          partenaire.save();
        }
      }
    });
  }

  var html = req.body.html;

  var handleResponse = function(error, success) {
    if (error) {
      return handleError(res, error);
    }
    return res.status(200).send(success);
  }

  return mailjet.sendContent(
    req.body.partenaire.email,
    req.body.subject,
    req.body.html,
    false,
    handleResponse
  );
};

exports.sendAssignment = function(req, res, next) {
  if (!req.body.html) {
    return res.status(400).send('No html given');
  }
  /*if (req.body.assignment){
    Partenaire.findOne({email: req.body.assignment}, function(error, result){
      if(error){
        return handleError(res, error);
      }
      else {
        if(!result){
          var partenaire = new Partenaire({email: req.body.assignment});
          partenaire.save();
        }
      }
    });
  }*/

  var html = req.body.html;

  var handleResponse = function(error, success) {
    if (error) {
      return handleError(res, error);
    }
    return res.status(200).send(success);
  }

  return mailjet.sendContent(
    req.body.assignment,
    req.body.subject,
    req.body.html,
    false,
    handleResponse
  );
};

function handleError(res, err) {
  return res.send(500, err);
}
