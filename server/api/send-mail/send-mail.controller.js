'use strict';

import MailSender from '../../components/mailsender/mail-sender';
import config from '../../config/environment';

const mailSender = new MailSender(config.mailSender);

export function sendMail({ email, title, body, attachments, replyto }) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Email:\t' + email);
    console.log('Title:\t' + 'Votre Mdph en ligne - ' + title);
    console.log('Body:\t' + body);
    console.log('Attachements:\t' + attachments);
    console.log('ReplyTo:\t' + replyto);
  } else {
    return mailSender.sendContent({
      email,
      title: 'Votre Mdph en ligne - ' + title,
      body,
      attachments,
      replyto
    });
  }
}

exports.sendMail = sendMail;
