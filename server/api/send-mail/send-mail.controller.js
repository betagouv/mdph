'use strict';

import MailSender from '../../mailsender/mail-sender';
import config from '../../config/environment';

const mailSender = new MailSender(config.mailSender.smtpUser, config.mailSender.smtpPass, config.mailSender.smtpHost, config.mailSender.smtpPort, config.mailSender.mailFrom);

export function sendMail(mail, title, body, attachements) {
  if (process.env.NODE_ENV !== 'production') {
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
