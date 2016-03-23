'use strict';

const _ = require('lodash');
const Mailer = require('./send-mail.controller');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const MakePdf = require('../../components/make-pdf');

// const receptionMailTemplate =  String(fs.readFileSync(path.join(__dirname, 'reception-request-email-premailer.html')));
//
// const receptionMailTemplate =  String(fs.readFileSync(path.join(__dirname, 'reception-request-email.html')));
// const receptionMailCompiled = Handlebars.compile(receptionMailTemplate);

const confirmationMailTemplate =  String(fs.readFileSync(path.join(__dirname, 'confirm-email-premailer.html')));
const confirmationMailCompiled = Handlebars.compile(confirmationMailTemplate);

export function sendMailNotificationAgent(request, email, callback) {
  Mailer.sendMail(email, 'Vous avez reçu une nouvelle demande', 'Référence de la demande: ' + request.shortId);
}

export function sendMailCompletude(request, evaluator) {
  Mailer.sendMail(request.user.email,
    'Accusé de complétude de votre dossier',
    'Les documents obligatoires que vous nous avez transmis ont tous été validés par ' + evaluator.name + ' de la MDPH ' + request.mdph + '. Votre dosser est désormais considéré comme complet.'
  );
}

export function sendMailDemandeDocuments(request, evaluator) {
  Mailer.sendMail(request.user.email,
    'Demande de complétude de votre dossier',
    'Les documents obligatoires que vous nous avez transmis n\'ont pas tous été validés par ' + evaluator.name + ' de la MDPH ' + request.mdph + '.\nVous devez vous reconnecter pour renvoyer les pièces en erreur manquantes.'
  );
}

export function sendMailReceivedTransmission(options) { //request, email, pdfPath) {
  MakePdf.make(options, function(err, pdfPath) {
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

export function generateReceptionMail(request) {
  const receptionMailTemplate =  String(fs.readFileSync(path.join(__dirname, 'reception-request-email.html')));
  const receptionMailCompiled = Handlebars.compile(receptionMailTemplate);

  const options = {};

  const invalidDocumentTypes = request.getInvalidDocumentTypes();
  const nonPresentAskedDocumentTypes = request.getNonPresentAskedDocumentTypes();

  if (!request.receivedAt) {
    options.receivedAt = moment();
  } else {
    options.receivedAt = request.receivedAt;
  }

  if (invalidDocumentTypes.length > 0) {
    options.en_attente_usager = true;
    options.invalidDocumentTypes = invalidDocumentTypes;
  } else if (nonPresentAskedDocumentTypes.length > 0) {
    options.en_attente_usager = true;
    options.nonPresentAskedDocumentTypes = nonPresentAskedDocumentTypes;
  } else {
    options.enregistree = true;
  }

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
