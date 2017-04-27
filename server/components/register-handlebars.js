'use strict';

import Handlebars from 'handlebars';
import moment from 'moment';

import {readTemplateSync} from './templates';
import {allDocumentTypesById} from '../api/document-type/document-type.controller';

function isMale(sex) {
  return !sex || sex === 'homme';
}

Handlebars.registerPartial({
  head: readTemplateSync('head.html'),
  section: readTemplateSync('section.html'),
  identites: readTemplateSync('identites.html'),
  identite: readTemplateSync('identite.html'),
  autorite: readTemplateSync('autorite.html'),
  question: readTemplateSync('question.html'),
  detailsFrais: readTemplateSync('detailsFrais.html'),
  detailsStructures: readTemplateSync('detailsStructures.html'),
  detailsDiplomes: readTemplateSync('detailsDiplomes.html'),
  detailsEtablissement: readTemplateSync('detailsEtablissement.html'),
  detailsEDT: readTemplateSync('detailsEDT.html'),
  detailsCV: readTemplateSync('detailsCV.html'),
  prestations: readTemplateSync('prestations.html'),

  // Synthese
  geva: readTemplateSync('geva.html'),
  propositions: readTemplateSync('propositions.html'),
  prestaDemande: readTemplateSync('prestaDemande.html'),
  prestaAutre: readTemplateSync('prestaAutre.html'),
  gevaAnswers: readTemplateSync('gevaAnswers.html')
});

Handlebars.registerHelper('moment', function(str) {
  if (str) {
    let date = str;

    if (!moment.isMoment(str)) {
      date = moment(str, moment.ISO_8601);
    }

    if (date.isValid()) {
      return date.format('DD/MM/YYYY');
    } else {
      return str;
    }
  }

  return str;
});

Handlebars.registerHelper('contact', function(str) {
  return str === 'oui' ? 'et a déjà pris contact' : 'mais n\'a pas encore pris contact';
});

Handlebars.registerHelper('ntobr', function(str) {
  return str && str.replace(/\n/g, '<br>');
});

Handlebars.registerHelper('invalidDocument', printInvalidDocument);

function printInvalidDocument(item) {

  const documentType = allDocumentTypesById[item.type];

  if (item.invalidReason) {
    return `${documentType.label} : ${item.invalidReason}`;
  }

  return documentType.label;
}

Handlebars.registerHelper('invalidDocumentList', function(items) {
  var out = '<ul>';

  for (let i = 0, l = items.length; i < l; i++) {
    out = out + '<li>' + printInvalidDocument(items[i]) + '</li>';
  }

  return out + '</ul>';
});

Handlebars.registerHelper('documentType', printDocumentType);

function printDocumentType(id) {
  const documentType = allDocumentTypesById[id];

  if (documentType.rejectionReason) {
    var rejectionReason = documentType.rejectionReason;

    return `${documentType.label} : ${rejectionReason}`;
  }

  return documentType.label;
}

Handlebars.registerHelper('documentTypeList', function(items) {
  var out = '<ul>';

  for (let i = 0, l = items.length; i < l; i++) {
    out = out + '<li>' + printDocumentType(items[i]) + '</li>';
  }

  return out + '</ul>';
});

Handlebars.registerHelper('capitalize', function(str, force) {
  if (!str || typeof str !== 'string') {
    return str;
  }

  if (force === 'upper') {
    return str.toUpperCase();
  }

  return str.toLowerCase().replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
});

Handlebars.registerHelper('conjugaison', function(sexe) {
  return isMale(sexe) ? '' : 'e';
});

Handlebars.registerHelper('pronoun', function(sexe, capitalize) {
  if (!sexe) {
    return 'il/elle';
  }

  if (capitalize) {
    return isMale(sexe) ? 'Il' : 'Elle';
  }

  return isMale(sexe) ? 'il' : 'elle';
});
