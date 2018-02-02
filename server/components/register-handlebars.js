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

Handlebars.registerHelper('documentType', printDocumentType);

function printDocumentType(id, invalidDocuments) {
  const documentType = allDocumentTypesById[id];

  var out = documentType.rejectionReason ?  `${documentType.label} : ${documentType.rejectionReason}` : `${documentType.label}`;

  if(invalidDocuments.length > 0){
    out += "<ul>";
    invalidDocuments.forEach(function(invalidDocument) {
       if(invalidDocument.type === id){
         out += "<li style=\"text-indent: 15px;\"> Le fichier " + invalidDocument.originalname + " est invalide";
         if (invalidDocument.invalidReason) {
           out += " pour la raison suivante : " + invalidDocument.invalidReason + "</li>";
         }
       }
    });
    out += "</ul>";
  }

  return new Handlebars.SafeString(out);
}

Handlebars.registerHelper('documentTypeList', function(items, invalidDocuments) {
  var out = '<ul>';

  for (let i = 0, l = items.length; i < l; i++) {
    out = out + '<li>' + printDocumentType(items[i], invalidDocuments) + '</li>';
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

Handlebars.registerHelper('ouiNon', function(str) {
  return str ==='true' ? 'Oui' : 'Non';
});
