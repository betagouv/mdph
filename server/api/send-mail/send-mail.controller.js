'use strict';

const Mailjet = require('../../mailjet/mailjet');

const apiKey = process.env.API_KEY;
const secretKey = process.env.SECRET_KEY;
const mailjet = new Mailjet(apiKey, secretKey);

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
