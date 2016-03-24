'use strict';

const _ = require('lodash');
const Mailer = require('./send-mail.controller');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

import pdfMaker from '../../components/pdf-maker';

const receptionMailTemplate =  String(fs.readFileSync(path.join(__dirname, 'reception-request-email.html')));
const receptionMailCompiled = Handlebars.compile(receptionMailTemplate);

const confirmationMailTemplate =  String(fs.readFileSync(path.join(__dirname, 'confirm-email-premailer.html')));
const confirmationMailCompiled = Handlebars.compile(confirmationMailTemplate);

export function sendMailNotificationAgent(request, email, callback) {
  Mailer.sendMail(email, 'Vous avez reçu une nouvelle demande', 'Référence de la demande: ' + request.shortId);
}

export function sendMailCompletude(request,options) {
  return generateReceptionMail(request, options)
    .then(html => {
      Mailer.sendMail(request.user.email,
        'Accusé de réception de votre MDPH',
        html
      );

      return html;
    });
}

export function sendMailReceivedTransmission(options) {
  pdfMaker(options).then(pdfPath => {
    if (pdfPath) {
      Mailer.sendMail(options.email,
        'Votre demande à bien été transmise',
        'Merci d\'avoir passé votre demande avec notre service. <br> Votre demande à été transmise à votre MDPH. Vous pouvez trouver ci-joint un récapitulatif de votre demande au format PDF.',
        [
          {
            filename: options.request.shortId + '.pdf',
            path: pdfPath
          }
        ]
      );
    }
  });
}

export function generateReceptionMail(request, options) {
  return new Promise(function(resolve) {
    let body = receptionMailCompiled({
      request,
      options
    });

    resolve(body);
  });
}

export function sendConfirmationMail(to, confirmationUrl) {
  const body = confirmationMailCompiled({confirmationUrl: confirmationUrl});

  Mailer.sendMail(to, 'Veuillez confirmer votre adresse e-mail', body);
}
