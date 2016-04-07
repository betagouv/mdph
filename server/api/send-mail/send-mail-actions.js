'use strict';

const _ = require('lodash');
const Mailer = require('./send-mail.controller');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const EmailTemplate = require('email-templates').EmailTemplate;

import pdfMaker from '../../components/pdf-maker';

function compileContent(contentFile) {
  const contentTemplate =  String(fs.readFileSync(path.join(__dirname, 'templates', 'specific-content', contentFile)));
  return Handlebars.compile(contentTemplate);
}

const receptionContentCompiled = compileContent('reception-request-content.html');
const receptionFooterCompiled = compileContent('reception-request-footer.html');

const confirmationContentCompiled = compileContent('confirm-content.html');
const confirmationFooterCompiled = compileContent('confirm-footer.html');

const genericTemplate = path.join(__dirname, 'templates', 'generic-email');

function generateEmailBodyWithTemplate(options) {
  return new Promise(function(resolve) {
    let {title, content, footer} = options;
    let template = new EmailTemplate(genericTemplate);

    let locals = {};
    locals.title = new Handlebars.SafeString(title);
    locals.content = new Handlebars.SafeString(content);
    if (footer) {
      locals.footer = new Handlebars.SafeString(footer);
    }

    template
      .render(locals)
      .then(function(result) {
        resolve(result.html);
      });
  });
}

export function sendMailNotificationAgent(request, email) {
  let par = {};
  par.title = 'Vous avez reçu une nouvelle demande';
  par.content = '<p>Référence de la demande: ' + request.shortId + '</p>';

  return generateEmailBodyWithTemplate(par)
    .then(htmlContent => {
      Mailer.sendMail(email, par.title, htmlContent);
    });
}

export function sendMailReceivedTransmission(options) {
  pdfMaker(options).then(pdfPath => {
    if (pdfPath) {
      let par = {};
      par.title = 'Votre demande à bien été transmise';
      par.content = 'Merci d\'avoir passé votre demande avec notre service. <br> Votre demande à été transmise à votre MDPH. Vous pouvez trouver ci-joint un récapitulatif de votre demande au format PDF.';
      let attachements = [{filename: options.request.shortId + '.pdf', path: pdfPath}];

      generateEmailBodyWithTemplate(par)
        .then(htmlContent => {
          console.log('TOOT');
          Mailer.sendMail(options.email, par.title, htmlContent, attachements);
        });
    }
  });
}

export function sendConfirmationMail(emailDest, confirmationUrl) {
  let par = {};
  par.title = 'Veuillez confirmer votre adresse e-mail';
  par.content = confirmationContentCompiled({confirmationUrl: confirmationUrl});
  par.footer = confirmationFooterCompiled({confirmationUrl: confirmationUrl});

  return generateEmailBodyWithTemplate(par)
    .then(htmlContent => {
      Mailer.sendMail(emailDest, par.title, htmlContent);
    });
}

export function generateReceptionMail(request, options, title) {
  return new Promise(function(resolve) {
    let par = {};
    par.title = title;
    par.content = receptionContentCompiled({request, options});
    par.footer = receptionFooterCompiled({options});

    generateEmailBodyWithTemplate(par)
      .then(htmlContent => {
        resolve(htmlContent);
      });
  });
}

export function sendMailCompletude(request, options) {
  let title = 'Accusé de réception de votre MDPH';

  return generateReceptionMail(request, options, title)
    .then(html => {
      Mailer.sendMail(request.user.email, title, html);

      return html;
    });
}
