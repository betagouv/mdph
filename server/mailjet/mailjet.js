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
Mailjet.prototype.sendContent = function(to, subject, content) {
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
    html: content,
    attachments: [
      {
        filename: 'demande.pdf',
        content: wkhtmltopdf(content)
      }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Message sent: ' + info.response);
    }
  });
};

module.exports = Mailjet;
