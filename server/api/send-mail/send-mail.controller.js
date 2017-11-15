'use strict';

import MailSender from '../../components/mailsender/mail-sender';
import config from '../../config/environment';

const mailSender = new MailSender(config.mailSender);

export function sendMail({ email, title, body, attachments, replyTo }) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Email:\t' + email);
    console.log('Title:\t' + 'Votre Mdph en ligne - ' + title);
    console.log('Body:\t' + body);
    console.log('Attachements:\t' + JSON.stringify(attachments));
    console.log('ReplyTo:\t' + replyTo);
  } else {
    return mailSender.sendContent({
      email,
      title: 'Votre Mdph en ligne - ' + title,
      body,
      attachments,
      replyTo
    });
  }
}

exports.sendMail = sendMail;
