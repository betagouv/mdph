'use strict';

var Mailjet = require('../../mailjet/mailjet');
var Mdph = require('../mdph/mdph.model');
var Partenaire = require('../partenaire/partenaire.model');

var apiKey = process.env.API_KEY;
var secretKey = process.env.SECRET_KEY;

var mailjet = new Mailjet(apiKey, secretKey);

exports.sendMail = function(mail, title, body, attachements) {
  console.log(process.env);
  if (process.env.NODE_ENV === 'development') {
    console.log('Mail:\t' + mail);
    console.log('Title:\t' + 'Impact - ' + title);
    console.log('Body:\t' + body);
    console.log('Attachements:\t' + attachements);
  } else {
    return mailjet.sendContent(
        mail,
        'Impact - ' + title,
        body,
        attachements
      );
  }
};
