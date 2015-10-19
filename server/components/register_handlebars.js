'use strict';

var Handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
var moment = require('moment');

function readTemplateSync(template) {
  return String(fs.readFileSync(path.join(__dirname, 'templates', template)));
}

function isMale(sex) {
  return !sex || sex === 'masculin';
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
  prestations: readTemplateSync('prestations.html')
});

Handlebars.registerHelper('moment', function(str) {
  if (str) {
    return moment(str, moment.ISO_8601).format('DD/MM/YYYY');
  }

  return str;
});

Handlebars.registerHelper('contact', function(str) {
  return str === 'oui' ? 'et a déjà pris contact' : 'mais n\'a pas encore pris contact';
});

Handlebars.registerHelper('ntobr', function(str) {
  return str && str.replace(/\n/g, '<br>');
});

Handlebars.registerHelper('capitalize', function(str, force) {
  if (force === 'upper') {
    return str.toUpperCase();
  }

  return str && str.toLowerCase().replace(/\b\w/g, function(m) {
    return m.toUpperCase();
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

var answersTemplate = Handlebars.compile(readTemplateSync('pdfAnswers.html'));
module.exports = answersTemplate;
