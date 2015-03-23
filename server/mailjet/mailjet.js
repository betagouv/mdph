var wkhtmltopdf = require('wkhtmltopdf'),
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport');

// Initialization class
var Mailjet = function(apiKey, secretKey) {
  this._apiKey = apiKey;
  this._secretKey = secretKey;
};

Mailjet.prototype = {};

// Email sending code
Mailjet.prototype.sendContent = function(to, subject, content, cb) {
  var transporter = nodemailer.createTransport(smtpTransport({
      port: 465,
      host: 'in.mailjet.com',
      secure: true,
      auth: {
        user: this._apiKey,
        pass: this._secretKey
      }
  }));

  var mailOptions = {
    from: 'tech@apientreprise.fr',
    to: to,
    subject: subject,
    html: content
  };

  // if (hasAttachments){
  // 	mailOptions.attachments = [
  //     {
  //       filename: 'demande.pdf',
  //       content: wkhtmltopdf(content)
  //     }
  //   ];
  // }

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

module.exports = Mailjet;
