'use strict';

var Mailjet = require('../../mailjet/mailjet');
var Config = require('../../config/local.env');
var Mdph = require('../mdph/mdph.model');

var mailjet = new Mailjet(Config.API_KEY, Config.SECRET_KEY);

/**
 * Send answers by mail
 */
exports.sendMail = function(req, res, next) {
  if (!req.body.html) {
    return res.status(400).send('No html given');
  }
  if (!req.body.mdph) {
    return res.status(400).send('No mdph given');
  }

  var html = req.body.html;

  return mailjet.sendContent(
    req.body.mdph.email,
    'Nouvelle demande',
    req.body.html,
    true
  );
};

exports.sendConfirmation = function(req, res, next) {
  if (!req.body.html) {
    return res.status(400).send('No html given');
  }
  if (!req.body.partenaire) {
    return res.status(400).send('No partenaire given');
  }

  var html = req.body.html;

  return mailjet.sendContent(
    req.body.partenaire.email,
    'Ajout de documents - confirmation',
    req.body.html,
    false
  );
};

function handleError(res, err) {
  return res.send(500, err);
}
