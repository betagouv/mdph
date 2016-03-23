'use strict';

var _ = require('lodash');
var async = require('async');
var moment = require('moment');
var Handlebars = require('handlebars');

import {recapitulatif} from './templates';

var sections = require('../api/sections/sections.json');
var Prestation = require('../api/prestation/prestation.controller');

function rebuildAnswersFromModel(question, questionAnswers) {
  switch (question.type){
    case 'date':
      return [{label: moment(questionAnswers, moment.ISO_8601).format('DD/MM/YYYY')}];
    case 'text':
      var label;
      if (!questionAnswers) {
        label = 'Pas de réponses';
      } else {
        label = questionAnswers;
      }

      return [{label: label}];
    case 'radio':
      var constantAnswer = _.find(question.answers, {model: questionAnswers});
      if (!constantAnswer) {
        return [];
      }

      return [{
        label: constantAnswer.label,
        detailModel: constantAnswer.detailModel,
        detailType: constantAnswer.detailType
      }];
    case 'checkbox':
      var answers = [];
      question.answers.forEach(function(constantAnswer) {
        if (questionAnswers[constantAnswer.model]) {
          answers.push({
            label: constantAnswer.label,
            detailModel: constantAnswer.detailModel,
            detailType: constantAnswer.detailType
          });
        }
      });

      return answers;
    case 'frais':
      if (questionAnswers.listeFrais && questionAnswers.listeFrais.length > 0 && questionAnswers.listeFrais[0].nom !== '') {
        return [{label: 'Liste des frais', listeFrais: questionAnswers.listeFrais}];
      }

      return [{label: 'Pas de frais'}];
    case 'cv':
      return [{label: 'Curriculum vitae', listeCv: questionAnswers.experiences}];
    case 'diplomes':
      return [{label: 'Diplômes', listeDiplomes: questionAnswers.listeDiplomes}];
    case 'employeur':
      return [{label: questionAnswers.nom.value + ', ' + questionAnswers.adresse.value}];
    case 'structure':
      if (questionAnswers.valeur) {
        return [{
          label: 'Oui',
          structures: questionAnswers.structures
        }];
      }

      return [{label: 'Non'}];
    case 'emploiDuTemps':
      return [{
        label: 'Emploi du temps',
        jours: questionAnswers.jours
      }];
    case 'etablissement':
      return [{
        label: 'Etablissements',
        etablissements: questionAnswers.etablissements
      }];
  }
}

function computeAnswers(question, trajectoireAnswers) {
  var questionAnswers = trajectoireAnswers[question.model];
  if (typeof questionAnswers === 'undefined') {
    return [];
  }

  var filteredAnswers = rebuildAnswersFromModel(question, questionAnswers);
  if (!filteredAnswers) {
    return [];
  }

  filteredAnswers.forEach(function(answer) {
    if (answer.detailModel) {
      var detailType = answer.detailType;
      var detail = trajectoireAnswers[answer.detailModel];
      if (detailType) {
        answer.detail = moment(detail, moment.ISO_8601).format('DD/MM/YYYY');
      } else {
        answer.detail = detail;
      }
    }
  });

  return filteredAnswers;
}

function computeQuestions(request, trajectoireId) {
  var trajectoireAnswers = request.formAnswers[trajectoireId];
  if (!trajectoireAnswers) {
    return [];
  }

  var questions = [];
  var toutesQuestions = _.find(sections, function(current) {
    return current.id === trajectoireId;
  }).questions;

  _.forEach(toutesQuestions, function(question) {
    var answers = computeAnswers(question, trajectoireAnswers);

    if (answers && answers.length > 0) {
      questions.push({
        title: question.titleDefault,
        answers: answers
      });
    }
  });

  return questions;
}

function computeTrajectoires(request) {
  var trajectoires = [];

  var toutesTrajectoires = _.filter(sections, 'trajectoire');
  var filteredTrajectoires = _.cloneDeep(toutesTrajectoires);

  filteredTrajectoires.forEach(function(trajectoire) {
    var questions = computeQuestions(request, trajectoire.id);

    if (questions.length > 0) {
      trajectoire.questions = questions;
      trajectoires.push(trajectoire);
    }
  });

  return trajectoires;
}

exports.answersToHtml = function({request, host}, next) {
  if (!request.formAnswers) {
    return next(null, '<p>Pas de réponses fournies.</p>');
  }

  async.series({
    identites: function(callback) {
      callback(null, request.formAnswers.identites);
    },

    submittedAt: function(callback) {
      callback(null, moment(request.submittedAt).format('DD/MM/YYYY à HH:mm'));
    },

    sections: function(callback) {
      var trajectoires = computeTrajectoires(request);
      callback(null, trajectoires);
    },

    mdph: function(callback) {
      if (!request.mdph) {
        return callback(null, []);
      }

      callback(null, request.mdph);
    },

    request: function(callback) {
      callback(null, request);
    },

    colors: function(callback) {
      callback(null, [
        { class: '.section-identite', color: 'rgb(73, 82, 130)' },
        { class: '.section-vie_quotidienne', color: 'rgb(90, 136, 175)' },
        { class: '.section-prestations', color: 'rgb(255, 143, 27)' },
        { class: '.section-vie_au_travail', color: '#815EA5' },
        { class: '.section-aidant', color: '#815EA5' },
        { class: '.section-vie_scolaire', color: '#58A0E6' },
        { class: '.section-situations_particulieres', color: '#EA2E49' }
      ]);
    },

    path: function(callback) {
      callback(null, host);
    }

  },
  function(err, results) {
    if (err) { return next(err); }

    try {
      var html = recapitulatif(results);
      next(null, html);
    } catch (e) {
      next(null, '<html><body><p>Erreur lors de la génération du récapitulatif.</p><p>Détail de l\'erreur: ' + e + '</p></body></html>');
    }
  });
};
