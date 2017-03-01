'use strict';

import MailSender from '../../components/mailsender/mail-sender';
import config from '../../config/environment';

const mailSender = new MailSender(config.mailSender);

export function sendMail(mail, title, body, attachements) {
  if (process.env.NODE_ENV === 'dev') {
    console.log('Mail:\t' + mail);
    console.log('Title:\t' + 'Votre Mdph en ligne - ' + title);
    console.log('Body:\t' + body);
    console.log('Attachements:\t' + attachements);
  } else {
    return mailSender.sendContent(
        mail,
        'Votre Mdph en ligne - ' + title,
        body,
        attachements
      );
  }
}

exports.sendMail = sendMail;
