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

exports.sendMail = function(mail, title, body) {
  return mailjet.sendContent(
    mail,
    'Impact - ' + title,
    body
  );
};
