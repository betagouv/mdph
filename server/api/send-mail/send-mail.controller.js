'use strict';

import Mailjet from '../../mailjet/mailjet';
import config from '../../config/environment';

const mailjet = new Mailjet(config.mailjet.apiKey, config.mailjet.secretKey);

export function sendMail(mail, title, body, attachements) {
  if (process.env.NODE_ENV === 'dev') {
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
