'use strict';

import _ from 'lodash';
import async from 'async';
import moment from 'moment';

import {recapitulatif} from './templates';
import { populateAndSortPrestations } from '../api/prestation/prestation.controller';

var sections = require('../api/sections/sections.json');

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
    case 'adresse':
      var adresse = '';
      if(questionAnswers.complement_adresse) {
        adresse += questionAnswers.complement_adresse + '\n';
      }
      adresse += questionAnswers.nomVoie + '\n';
      adresse += questionAnswers.code_postal + ' ' +  questionAnswers.localite + ' ' + (questionAnswers.pays ?  questionAnswers.pays : '');

      return [{label: adresse}];
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
      switch (detailType){
        case 'date':
          answer.detail = moment(detail, moment.ISO_8601).format('DD/MM/YYYY');
          break;
        case 'date&text':
          answer.detail = 'Date d\'entrée prévue : ';
          answer.detail += moment(detail.date, moment.ISO_8601).format('DD/MM/YYYY');
          answer.detail += ' ; ' + detail.text;
          break;
        case 'date&categorie':
          answer.detail = detail.categorie;
          if(detail.date){
            answer.detail += ' ; Depuis le : ';
            answer.detail += moment(detail.date, moment.ISO_8601).format('DD/MM/YYYY');
          }
          break;
        case 'remunHandicap':
          answer.detail='';
          if(detail.detail1){
            answer.detail += 'Nombre d\'heures par semaine : ' + detail.detail1;
          }
          if(detail.detail1 && detail.detail2){
            answer.detail += '; ';
          }
          if(detail.detail2){
            answer.detail += 'Nombre d\'heures par an : ' + detail.detail2;
          }
          break;
        case 'pourcentage':
          answer.detail = detail + ' %';
          break;
        case 'remuneration':
          answer.detail = 'stage ' + (detail === 'true' ? 'rémunéré' : 'non rémunéré');
          break;
        default:
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

export default function({request, host, mdph}, next) {
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
      if (!mdph) {
        return callback(null, {});
      }

      callback(null, mdph);
    },

    request: function(callback) {
      populateAndSortPrestations(request).then(request => {
        callback(null, request);
      });
    },

    colors: function(callback) {
      callback(null, [
        { class: '.section-identite', color: 'rgb(96, 149, 195)' },
        { class: '.section-vie_quotidienne', color: 'rgb(38, 151, 135)' },
        { class: '.section-prestations', color: 'rgb(89, 135, 53)' },
        { class: '.section-vie_au_travail', color: 'rgb(21, 79, 131)' },
        { class: '.section-aidant', color: 'rgb(172, 35, 92)'  },
        { class: '.section-vie_scolaire', color: 'rgb(74, 44, 97)'},
        { class: '.section-situations_particulieres', color: 'rgb(234, 46, 73)' }
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
}
