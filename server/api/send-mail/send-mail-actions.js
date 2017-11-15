'use strict';

import moment from 'moment';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { EmailTemplate } from 'email-templates';
import * as Mailer from './send-mail.controller';
import pdfMaker from '../../components/pdf-maker';
import config from '../../config/environment';

function compileContent(contentFile) {
  const contentTemplate =  String(fs.readFileSync(path.join(__dirname, 'templates', 'specific-content', contentFile)));
  return Handlebars.compile(contentTemplate);
}

const receptionContentCompiled = compileContent('reception-request-content.html');
const confirmationContentCompiled = compileContent('confirm-content.html');
const urlFooterCompiled = compileContent('url-footer.html');
const expirationContentCompiled = compileContent('expiration-content.html');
const firstExpirationNotificationContentCompiled  = compileContent('firstExpirationNotification-content.html');
const lastExpirationNotificationContentCompiled  = compileContent('lastExpirationNotification-content.html');

const genericTemplate = path.join(__dirname, 'templates', 'generic-email');

function generateAndSend(options) {
  return generateEmailBodyWithTemplate(options).then(body => {
    options.body = body;

    return Mailer.sendMail(options);
  });
}

function generateEmailBodyWithTemplate({ title, content, footer }) {
  const locals = {
    title: new Handlebars.SafeString(title),
    content: new Handlebars.SafeString(content),
  };

  if (footer) locals.footer = new Handlebars.SafeString(footer);

  return new EmailTemplate(genericTemplate).render(locals).then(result => result.html);
}

export function sendMailNotificationAgent(request, email) {
  const options = {
    email,
    title: 'Vous avez reçu une nouvelle demande',
    content: '<p>Référence de la demande: ' + request.shortId + '</p>',
  };

  return generateAndSend(options);
}

export function sendMailReceivedTransmission(options) {
  const attachments = [];

  return pdfMaker(options)
    .then(pdfStream => {
      options.title = 'Votre demande a bien été transmise';
      options.content = 'Merci d\'avoir passé votre demande avec notre service. <br> Votre demande à été transmise à votre MDPH. Vous pouvez trouver ci-joint un récapitulatif de votre demande au format PDF.';
      attachments.push({filename: options.request.shortId + '.pdf', path: pdfStream.path});
      console.log("pdfStream.path : " + JSON.stringify(pdfStream.path));
      console.log("options : " + JSON.stringify(options));
      return options;
    })
    .then(generateEmailBodyWithTemplate)
    .then(body => {
      Mailer.sendMail({
        email: options.email,
        title: options.title,
        replyTo: options.replyTo,
        body,
        attachments
      }).then(trace => {});
    });
}

export function sendConfirmationMail(email, confirmationUrl) {
  const options = {
    email,
    title: 'Validation de votre compte',
    content: confirmationContentCompiled({confirmationUrl: confirmationUrl}),
  };

  return generateAndSend(options);
}

export function generateReceptionMail(request, options) {
  options.content = receptionContentCompiled({request, options});

  if (options.url) {
    options.footer = urlFooterCompiled({url: options.url});
  }

 return generateEmailBodyWithTemplate(options);
}

export function sendMailCompletude(request, contentOptions) {
  const options = {
    email: request.user.email,
    title: 'Accusé de réception de votre MDPH',
    content: receptionContentCompiled({request, options: contentOptions}),
    replyTo: contentOptions.replyTo
  };

  if (contentOptions.url) options.footer = urlFooterCompiled({url: contentOptions.url});

  return generateAndSend(options);
}

export function sendMailRenewPassword(email, confirmationUrl) {
  const options = {
    email,
    title: 'Nouveau mot de passe',
    content: 'Veuillez cliquer ici pour continuer votre changement de mot de passe :<br>' + confirmationUrl,
  };

  return generateAndSend(options);
}

export function sendMailExpiration(request) {
  const options = {
    email: request.user.email,
    title: 'Votre dossier MDPH a été supprimé',
    content: expirationContentCompiled({request}),
  };

  return generateAndSend(options);
}

export function sendMailFirstExpirationNotification(request) {
  const options = {
    email: request.user.email,
    title: 'Votre dossier MDPH sera supprimé dans six mois',
    expirationDate: moment().add(6, 'months'),
    url: `${config.baseUrl}/mdph/${request.mdph}/profil/${request.profile}/demande/${request.shortId}`,
  }

  const content = firstExpirationNotificationContentCompiled({request, options});
  options.content = content;

  return generateAndSend(options);
}

export function sendMailLastExpirationNotification(request) {
  const options = {
    email: request.user.email,
    title: 'Votre dossier MDPH sera supprimé dans un mois',
    expirationDate: moment().add(1, 'months'),
    url: `${config.baseUrl}/mdph/${request.mdph}/profil/${request.profile}/demande/${request.shortId}`,
  };

  const content = lastExpirationNotificationContentCompiled({request, options});
  options.content = content;

  return generateAndSend(options);
}
