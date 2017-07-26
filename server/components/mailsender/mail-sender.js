import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

class MailSender {
  constructor({ smtpUser, smtpPass, smtpHost, smtpPort, mailFrom }) {
    this._smtpUser = smtpUser;
    this._smtpPass = smtpPass;
    this._smtpHost = smtpHost;
    this._smtpPort = smtpPort;
    this._mailFrom = mailFrom;

    this._transporter = nodemailer.createTransport(
      smtpTransport({
        port: this._smtpPort,
        host: this._smtpHost,
        secure: true,
        auth: {
            user: this._smtpUser,
            pass: this._smtpPass
          }
      })
    );
  }

  sendContent({email, title, body, replyTo, attachments}, cb) {
    const mailOptions = {
      from: this._mailFrom,
      to: email,
      subject: title,
      html: body
    };

    if (replyTo) {
      mailOptions.replyTo = replyTo;
      mailOptions.bcc = this._mailFrom;
    }

    if (attachments) {
      mailOptions.attachments = attachments;
    }

    this._transporter.sendMail(mailOptions, cb);
  }
}

module.exports = MailSender;
