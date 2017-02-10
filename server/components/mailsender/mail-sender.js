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

  sendContent(to, subject, body, attachments, cb) {
    const mailOptions = {
      from: this._mailFrom,
      to: to,
      subject: subject,
      html: body
    };

    if (attachments) {
      mailOptions.attachments = attachments;
    }

    this._transporter.sendMail(mailOptions, cb);
  }
}

module.exports = MailSender;
