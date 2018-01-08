'use strict';

import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import Handlebars from 'handlebars';
import async from 'async';
import moment from 'moment';
import geva from '../../api/geva/questions.json';

function readTemplateSync(template) {
  return String(fs.readFileSync(path.join(__dirname, template)));
}

const template = Handlebars.compile(readTemplateSync('./templates/pdfSynthese.html'));
Handlebars.registerPartial('answers', readTemplateSync('./templates/answers.html'));
Handlebars.registerPartial('answers_unexpend', readTemplateSync('./templates/answers_unexpend.html'));

function enhanceAnswers(answersGeva, answers) {
  if(answersGeva){
    answersGeva.forEach(function(item) {
      if (_.indexOf(answers, item.id) !== -1) { // exist
        item.active = true;
      }
      enhanceAnswers(item.Reponses, answers);
    });
  }
}

function enhance(sectionGeva, answers) {
  sectionGeva.forEach(function(item) {
    if (_.indexOf(answers, item.id) !== -1) { // exist
      item.active = true;
    }
    enhanceAnswers(item.Reponses, answers);
  });
  return sectionGeva;
}

export default function({synthese, mdph, host}, next) {
  async.series({

    lastname: function(callback) {
      callback(null,  synthese.lastname);
    },

    firstname: function(callback) {
      callback(null,  synthese.firstname);
    },

    birthdate: function(callback) {
      callback(null, moment(synthese.birthdate, moment.ISO_8601).format('DD/MM/YYYY'));
    },

    environnement: function(callback) {
      var sectionGeva = _.filter(geva, {Section: 'éléments environnementaux'});
      callback(null, enhance(sectionGeva, synthese.geva.environnement));
    },

    personnel: function(callback) {
      var sectionGeva = _.filter(geva, {Section: 'éléments personnels'});
      callback(null, enhance(sectionGeva, synthese.geva.personnel));
    },

    scolaire_professionnel: function(callback) {
      var sectionGeva = _.filter(geva, {Section: 'éléments scolaires ou professionnels'});
      callback(null, enhance(sectionGeva, synthese.geva.scolaire_professionnel));
    },

    evolution_besoins: function(callback) {
      var sectionGeva = _.filter(geva, {Section: 'évolution et besoins'});
      callback(null, enhance(sectionGeva, synthese.geva.evolution_besoins));
    },

    date: function(callback) {
      callback(null, moment(new Date(), moment.ISO_8601).format('DD/MM/YYYY à HH:MM'));
    },

    mdph: function(callback) {
      callback(null, mdph);
    },

    path: function(callback) {
      callback(null, host);
    },

    colors: function(callback) {
      callback(null, [
        { class: '.section-identite', color: 'rgb(96, 149, 195)' },
        { class: '.section-environnement', color: 'rgb(37, 150, 134)' },
        { class: '.section-personnel', color: 'rgb(73, 44, 96)' },
        { class: '.section-scolaire_professionnel', color: 'rgb(20, 79, 131)' },
        { class: '.section-evolution_besoins', color: 'rgb(172, 15, 92)' },
      ]);
    }

  },
  function(err, results) {
    if (err) { next(err); }

    var html = template(results);

    next(null, html);
  });
}
