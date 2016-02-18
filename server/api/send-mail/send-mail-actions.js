'use strict';

const _ = require('lodash');
const Dispatcher = require('../../components/dispatcher');
const DateUtils = require('../../components/dateUtils');
const Mailer = require('../send-mail/send-mail.controller');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const confirmationMailTemplate =  String(fs.readFileSync(path.join(__dirname, 'confirm-email-premailer.html')));
const confirmationMailCompiled = Handlebars.compile(confirmationMailTemplate);

exports.sendMailNotification = function(request, host, log, callback) {
  Dispatcher.findSecteur(request, function(secteur) {
    var type = DateUtils.getType(request.formAnswers);

    if (secteur && secteur.evaluators && secteur.evaluators[type] && secteur.evaluators[type].length > 0) {
      var evaluators = secteur.evaluators[type];
      evaluators.forEach(function(evaluator) {
        Mailer.sendMail(evaluator.email, 'Vous avez reçu une nouvelle demande', 'Référence de la demande: ' + request.shortId);
      });

      callback(secteur);
    } else {
      callback();
    }
  });
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

exports.sendMailReceivedTransmission = function(request, email, pdfPath) {
  Mailer.sendMail(email,
    'Votre demande à bien été transmise',
    'Merci d\'avoir passé votre demande avec notre service. <br> Votre demande à été transmise à votre MDPH. Vous pouvez trouver ci-joint un récapitulatif de votre demande au format PDF.',
    [
      {
        filename: request.shortId + '.pdf',
        path: pdfPath
      }
    ]
  );
};

exports.sendConfirmationMail = function(to, confirmationUrl) {
  const body = confirmationMailCompiled({confirmationUrl: confirmationUrl});

  Mailer.sendMail(to, 'Veuillez confirmer votre adresse e-mail', body);
};
