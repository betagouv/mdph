'use strict';

var Mailjet = require('../../mailjet/mailjet');
var Mdph = require('../mdph/mdph.model');
var Partenaire = require('../partenaire/partenaire.model');

var config = require('../../config/local.env.sample');

var apiKey = process.env.API_KEY || config.API_KEY;
var secretKey = process.env.SECRET_KEY || config.SECRET_KEY;
var mailjet = new Mailjet(apiKey, secretKey);

exports.sendMail = function(mail, title, body, attachements) {
  return mailjet.sendContent(
    mail,
    'Impact - ' + title,
    body,
    attachements
  );
};
