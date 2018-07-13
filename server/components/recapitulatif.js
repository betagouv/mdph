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
    case 'pourcentage':
      if (!questionAnswers) {
        return [];
      }

      return [{ label: questionAnswers + ' %'}];

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
      return questionAnswers.listeDiplomes && questionAnswers.listeDiplomes.length > 0 ?
             [{label: 'Diplômes', listeDiplomes: questionAnswers.listeDiplomes}] :
             [{label: 'Pas de réponse'}];
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
      if (questionAnswers.etablissements && questionAnswers.etablissements.length > 0) {
        return [{
          label: 'Etablissements',
          etablissements: questionAnswers.etablissements
        }];
      }

      return [{
        label: 'Pas de réponse'
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
          if (detail){
            answer.detail = moment(detail, moment.ISO_8601).format('DD/MM/YYYY');
          }
          break;
        case 'duree':
          answer.detail = '';
          if (detail && detail.debut){
            answer.detail += 'Du ';
            answer.detail += moment(detail.debut, moment.ISO_8601).format('DD/MM/YYYY');
          }
          if (detail && detail.fin){
            if (detail.debut){
              answer.detail += ' au ';
            } else {
              answer.detail += 'Au ';
            }
            answer.detail += moment(detail.fin, moment.ISO_8601).format('DD/MM/YYYY');
          }
          break;
        case 'date&text':
          answer.detail = 'Date d\'entrée prévue : ';
          answer.detail += moment(detail.date, moment.ISO_8601).format('DD/MM/YYYY');
          if(detail.text) answer.detail += ' ; ' + detail.text;
          break;
        case 'depuis':
          if(detail){
            answer.detail = 'Depuis le ';
            answer.detail += moment(detail, moment.ISO_8601).format('DD/MM/YYYY');
          }
          break;
        case 'jour':
          if(detail){
            answer.detail = 'Le ';
            answer.detail += moment(detail, moment.ISO_8601).format('DD/MM/YYYY');
          }
          break;
        case 'fraisInternat':
          if(detail !== undefined){
            if(detail){
              answer.detail = 'Les frais de séjour sont intégralement pris en charge par l\'assurance maladie, l\'Etat ou l\'aide sociale';
            } else {
              answer.detail = 'Les frais de séjour ne sont pas intégralement pris en charge par l\'assurance maladie, l\'Etat ou l\'aide sociale';
            }
          }
          break;
        case 'date&categorie':
          answer.detail = 'De ' + detail.categorie;
          if(detail.date){
            answer.detail2 = 'Depuis le ';
            answer.detail2 += moment(detail.date, moment.ISO_8601).format('DD/MM/YYYY');
          }
          break;
        case 'remunHandicap':
          if(detail.detail1){
            answer.detail = 'Nombre d\'heures par semaine : ' + detail.detail1;
          }
          if(detail.detail2){
            answer.detail2 = 'Nombre d\'heures par an : ' + detail.detail2;
          }
          break;
        case 'pourcentage':
          answer.detail = detail + ' %';
          break;
        case 'remuneration':
          answer.detail = 'stage ' + (detail === true ? 'rémunéré' : 'non rémunéré');
          break;
        case 'indemnisation':
          answer.detail = 'Auprès de l\'organisme : ' + detail;
          break;
        default:
          answer.detail = detail;
      }
    }
  });

  return filteredAnswers;
}

function computeQuestions(request, trajectoireId) {
  var trajectoireAnswers = request.data[trajectoireId];
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
  if (!request.data) {
    return next(null, '<p>Pas de réponses fournies.</p>');
  }

  async.series({
    identites: function(callback) {

      if(request.data.identites.beneficiaire && request.data.identites.beneficiaire && request.data.identites.beneficiaire.nationalite) {

        switch(request.data.identites.beneficiaire.nationalite) {
          case "francaise":
            request.data.identites.beneficiaire.nationalite = "Française";
            break;
          case "ue":
            request.data.identites.beneficiaire.nationalite = "Espace Économique Européen ou Suisse";
            break;
          default:
            request.data.identites.beneficiaire.nationalite = "Autre";
        }
      }

      if(request.data.identites && request.data.identites.autorite && request.data.identites.autorite.parent1 && request.data.identites.autorite.parent1.isSameAddress){
        request.data.identites.autorite.parent1.complement_adresse = request.data.identites.beneficiaire.complement_adresse;
        request.data.identites.autorite.parent1.nomVoie = request.data.identites.beneficiaire.nomVoie;
        request.data.identites.autorite.parent1.code_postal = request.data.identites.beneficiaire.code_postal;
        request.data.identites.autorite.parent1.localite = request.data.identites.beneficiaire.localite;
        request.data.identites.autorite.parent1.pays = request.data.identites.beneficiaire.pays;
      }
      if(request.data.identites && request.data.identites.autorite && request.data.identites.autorite.parent2 && request.data.identites.autorite.parent2.isSameAddress){
        request.data.identites.autorite.parent2.complement_adresse = request.data.identites.beneficiaire.complement_adresse;
        request.data.identites.autorite.parent2.nomVoie = request.data.identites.beneficiaire.nomVoie;
        request.data.identites.autorite.parent2.code_postal = request.data.identites.beneficiaire.code_postal;
        request.data.identites.autorite.parent2.localite = request.data.identites.beneficiaire.localite;
        request.data.identites.autorite.parent2.pays = request.data.identites.beneficiaire.pays;
      }
      if(request.data.identites && request.data.identites.representant && request.data.identites.representant.representant1 && request.data.identites.representant.representant1.isSameAddress){
        request.data.identites.representant.representant1.complement_adresse = request.data.identites.beneficiaire.complement_adresse;
        request.data.identites.representant.representant1.nomVoie = request.data.identites.beneficiaire.nomVoie;
        request.data.identites.representant.representant1.code_postal = request.data.identites.beneficiaire.code_postal;
        request.data.identites.representant.representant1.localite = request.data.identites.beneficiaire.localite;
        request.data.identites.representant.representant1.pays = request.data.identites.beneficiaire.pays;
      }
      if(request.data.identites && request.data.identites.representant && request.data.identites.representant.representant2 && request.data.identites.representant.representant2.isSameAddress){
        request.data.identites.representant.representant2.complement_adresse = request.data.identites.beneficiaire.complement_adresse;
        request.data.identites.representant.representant2.nomVoie = request.data.identites.beneficiaire.nomVoie;
        request.data.identites.representant.representant2.code_postal = request.data.identites.beneficiaire.code_postal;
        request.data.identites.representant.representant2.localite = request.data.identites.beneficiaire.localite;
        request.data.identites.representant.representant2.pays = request.data.identites.beneficiaire.pays;
      }
      callback(null, request.data.identites);
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
