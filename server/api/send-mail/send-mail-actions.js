'use strict';

import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import * as Mailer from './send-mail.controller';

const EmailTemplate = require('email-templates').EmailTemplate;

import pdfMaker from '../../components/pdf-maker';

function compileContent(contentFile) {
  const contentTemplate =  String(fs.readFileSync(path.join(__dirname, 'templates', 'specific-content', contentFile)));
  return Handlebars.compile(contentTemplate);
}

const receptionContentCompiled = compileContent('reception-request-content.html');
const confirmationContentCompiled = compileContent('confirm-content.html');
const urlFooterCompiled = compileContent('url-footer.html');
const expirationContentCompiled = compileContent('expiration-content.html');

const genericTemplate = path.join(__dirname, 'templates', 'generic-email');

function generateEmailBodyWithTemplate(options) {
  let {title, content, footer} = options;
  let template = new EmailTemplate(genericTemplate);

  let locals = {};
  locals.title = new Handlebars.SafeString(title);
  locals.content = new Handlebars.SafeString(content);

  if (footer) {
    locals.footer = new Handlebars.SafeString(footer);
  }

  return template
    .render(locals)
    .then(function(result) {
      return result.html;
    });
}

export function sendMailNotificationAgent(request, email) {
  let options = {};
  options.title = 'Vous avez reçu une nouvelle demande';
  options.content = '<p>Référence de la demande: ' + request.shortId + '</p>';

  return generateEmailBodyWithTemplate(options)
    .then(htmlContent => {
      Mailer.sendMail(email, options.title, htmlContent);
    });
}

export function sendMailReceivedTransmission(options) {
  let attachements;
  return pdfMaker(options)
    .then(pdfPath => {
      options.title = 'Votre demande a bien été transmise';
      options.content = 'Merci d\'avoir passé votre demande avec notre service. <br> Votre demande à été transmise à votre MDPH. Vous pouvez trouver ci-joint un récapitulatif de votre demande au format PDF.';
      attachements = [{filename: options.request.shortId + '.pdf', path: pdfPath}];
      return options;
    })
    .then(generateEmailBodyWithTemplate)
    .then(htmlContent => {
      Mailer.sendMail(options.email, options.title, htmlContent, attachements);
    });
}

export function sendConfirmationMail(emailDest, confirmationUrl) {
  let options = {};
  options.title = 'Veuillez confirmer votre adresse e-mail';
  options.content = confirmationContentCompiled({confirmationUrl: confirmationUrl});
  options.footer = urlFooterCompiled({url: confirmationUrl});

  return generateEmailBodyWithTemplate(options)
    .then(htmlContent => {
      Mailer.sendMail(emailDest, options.title, htmlContent);
    });
}

export function generateReceptionMail(request, options, title) {
  options.title = title;
  options.content = receptionContentCompiled({request, options});

  if (options.url) {
    options.footer = urlFooterCompiled({url: options.url});
  }

  return generateEmailBodyWithTemplate(options);
}

export function sendMailCompletude(request, options) {
  let title = 'Accusé de réception de votre MDPH';

  return generateReceptionMail(request, options, title)
    .then(html => {
      Mailer.sendMail(request.user.email, title, html);

      return html;
    });
}

export function sendMailRenewPassword(emailDest, confirmationUrl) {
  let options = {};
  options.title = 'Nouveau mot de passe';
  options.content = 'Veuillez cliquer ici pour continuer votre changement de mot de passe :<br>' + confirmationUrl;

  return generateEmailBodyWithTemplate(options)
    .then(htmlContent => {
      Mailer.sendMail(emailDest, options.title, htmlContent);
    });
}

export function sendMailExpiration(request) {
  let options = {};
  options.title = 'Votre Mdph en ligne';
  options.content = expirationContentCompiled({request});

  return generateEmailBodyWithTemplate(options)
    .then(htmlContent => {
      Mailer.sendMail(request.user.email, options.title, htmlContent);
    });
}

export function sendMailFirstExpirationNotification(request) {
  let options = {};
  options.title = 'Votre Mdph en ligne';
  options.content = firstExpirationNotificationContentCompiled({request});

  return generateEmailBodyWithTemplate(options)
    .then(htmlContent => {
      Mailer.sendMail(request.user.email, options.title, htmlContent);
    });
}

export function sendMailLastExpirationNotification(request) {
  let options = {};
  options.title = 'Votre Mdph en ligne';
  options.content = lastExpirationNotificationContentCompiled({request});

  return generateEmailBodyWithTemplate(options)
    .then(htmlContent => {
      Mailer.sendMail(request.user.email, options.title, htmlContent);
    });
}


