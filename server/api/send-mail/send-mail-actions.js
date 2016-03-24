'use strict';

const _ = require('lodash');
const Mailer = require('./send-mail.controller');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
import pdfMaker from '../../components/pdf-maker';

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

exports.sendMailReceivedTransmission = function(options) {
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
};

exports.sendConfirmationMail = function(to, confirmationUrl) {
  const body = confirmationMailCompiled({confirmationUrl: confirmationUrl});

  Mailer.sendMail(to, 'Veuillez confirmer votre adresse e-mail', body);
};
