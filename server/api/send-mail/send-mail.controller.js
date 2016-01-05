'use strict';

const Mailjet = require('../../mailjet/mailjet');
const Mdph = require('../mdph/mdph.model');
const Partenaire = require('../partenaire/partenaire.model');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.API_KEY;
const secretKey = process.env.SECRET_KEY;
const mailjet = new Mailjet(apiKey, secretKey);

const confirmationMailTemplate =  String(fs.readFileSync(path.join(__dirname, 'confirm-email-premailer.html')));
const confirmationMailCompiled = Handlebars.compile(confirmationMailTemplate);

exports.sendConfirmationMail = function(to, confirmationUrl) {
  const body = confirmationMailCompiled({confirmationUrl: confirmationUrl});
  sendMail(to, 'Veuillez confirmer votre adresse e-mail', body);
};

function sendMail(mail, title, body, attachements) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Mail:\t' + mail);
    console.log('Title:\t' + 'Votre Mdph en ligne - ' + title);
    console.log('Body:\t' + body);
    console.log('Attachements:\t' + attachements);
  } else {
    return mailjet.sendContent(
        mail,
        'Votre Mdph en ligne - ' + title,
        body,
        attachements
      );
  }
}

exports.sendMail = sendMail;
