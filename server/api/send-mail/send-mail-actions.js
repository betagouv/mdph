'use strict';

const _ = require('lodash');
const Mailer = require('./send-mail.controller');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const MakePdf = require('../../components/make-pdf');

// const incompleteRequestMailTemplate =  String(fs.readFileSync(path.join(__dirname, 'refused-request-email-premailer.html')));

const incompleteRequestMailTemplate =  String(fs.readFileSync(path.join(__dirname, 'refused-request-email.html')));
const incompleteRequestMailCompiled = Handlebars.compile(incompleteRequestMailTemplate);

const confirmationMailTemplate =  String(fs.readFileSync(path.join(__dirname, 'confirm-email-premailer.html')));
const confirmationMailCompiled = Handlebars.compile(confirmationMailTemplate);

exports.sendMailNotificationAgent = function(request, email, callback) {
  Mailer.sendMail(email, 'Vous avez reçu une nouvelle demande', 'Référence de la demande: ' + request.shortId);
};

exports.sendMailCompletude = function(request, evaluator) {
  Mailer.sendMail(request.user.email,
    'Accusé de complétude de votre dossier',
    'Les documents obligatoires que vous nous avez transmis ont tous été validés par ' + evaluator.name + ' de la MDPH ' + request.mdph + '. Votre dosser est désormais considéré comme complet.'
  );
};

exports.sendMailDemandeDocuments = function(request, evaluator) {
  Mailer.sendMail(request.user.email,
    'Demande de complétude de votre dossier',
    'Les documents obligatoires que vous nous avez transmis n\'ont pas tous été validés par ' + evaluator.name + ' de la MDPH ' + request.mdph + '.\nVous devez vous reconnecter pour renvoyer les pièces en erreur manquantes.'
  );
};

exports.sendMailReceivedTransmission = function(options) { //request, email, pdfPath) {
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
};

exports.sendMailDemandeDocuments = function(request, evaluator) {

  const body = incompleteRequestMailCompiled({
    requestUrl: request.shortId,
    receivedAt: request.receivedAt
  });

  Mailer.sendMail(request.user.email, 'Demande de complétude de votre dossier', body);
};

exports.sendConfirmationMail = function(to, confirmationUrl) {
  const body = confirmationMailCompiled({confirmationUrl: confirmationUrl});

  Mailer.sendMail(to, 'Veuillez confirmer votre adresse e-mail', body);
};
