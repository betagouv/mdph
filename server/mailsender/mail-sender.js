import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

// Initialization class
var MailSender = function(smtpUser, smtpPass, smtpHost, smtpPort, mailFrom) {
  this._smtpUser = smtpUser;
  this._smtpPass = smtpPass;
  this._smtpHost = smtpHost;
  this._smtpPort = smtpPort;
  this._mailFrom = mailFrom;
};

MailSender.prototype = {};

// Email sending code
MailSender.prototype.sendContent = function(to, subject, body, attachments, cb) {
  var transporter = nodemailer.createTransport(smtpTransport({
    port: this._smtpPort,
    host: this._smtpHost,
    secure: true,
    auth: {
        user: this._smtpUser,
        pass: this._smtpPass
      }
  }));

  var mailOptions = {
    from: this._mailFrom,
    to: to,
    subject: subject,
    html: body
  };

  if (attachments) {
    mailOptions.attachments = attachments;
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      if (cb) cb(error, null);
    } else {
      console.log('Message sent: ' + info.response);
      if (cb) cb(null, info.response);
    }
  });
};

module.exports = MailSender;
