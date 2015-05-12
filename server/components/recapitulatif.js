'use strict';

/* jshint multistr: true */

var _ = require('lodash');
var os = require('os');
var fs = require('fs');
var path = require('path')
var async = require('async');
var moment = require('moment');
var mustache = require('mustache');

var sections = require('../api/sections/sections.json');

function readFile(name, callback) {
  fs.readFile(path.join(__dirname, 'templates', name), function (err, html) {
    callback(err, String(html));
  });
}

function formatDateNaissance(identite) {
  if (identite && identite.dateNaissance) {
    identite.dateNaissance = moment(identite.dateNaissance).format('DD/MM/YYYY');
  }
}

function rebuildAnswersFromModel(question, questionAnswers) {
  switch (question.type){
    case 'date':
      return [{label: moment(questionAnswers).format('DD/MM/YYYY')}];
    case 'text':
      return [{label: questionAnswers}];
    case 'radio':
      var constantAnswer = _.find(question.answers, {model: questionAnswers});
      if (!constantAnswer) {
        return [];
      }
      return [{label: constantAnswer.label, detailModel: constantAnswer.detailModel}];
    case 'checkbox':
      var answers = [];
      question.answers.forEach(function(constantAnswer) {
        if (questionAnswers[constantAnswer.model]) {
          answers.push({label: constantAnswer.label, detailModel: constantAnswer.detailModel});
        }
      });
      return answers;
    case 'frais':
      return [{label: 'Liste des frais', listeFrais: questionAnswers.listeFrais}];
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
    console.log(question);
    console.log(questionAnswers);
    return [];
  }

  filteredAnswers.forEach(function(answer){
    if (answer.detailModel) {
      answer.detail = trajectoireAnswers[answer.detailModel];
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


exports.answersToHtml = function(request, path, output, next) {
  if (!request.formAnswers) {
    return next({request: request._id, action: 'recapitulatif', message: 'Pas de réponses fournies'});
  }

  async.series({
    answersTemplate: function(callback){
      if (output === 'pdf') {
        readFile('pdfAnswers.html', callback);
      } else {
        readFile('inlineAnswers.html', callback);
      }
    },
    section: function(callback){
      readFile('section.html', callback);
    },
    identites: function(callback){
      readFile('identites.html', callback);
    },
    identite: function(callback){
      readFile('identite.html', callback);
    },
    autorite: function(callback){
      readFile('autorite.html', callback);
    },
    question: function(callback){
      readFile('question.html', callback);
    },
    detailsFrais: function (callback) {
      readFile('detailsFrais.html', callback);
    },
    detailsDiplomes: function (callback) {
      readFile('detailsDiplomes.html', callback);
    },
    detailsStructures: function (callback) {
      readFile('detailsStructures.html', callback);
    },
    detailsEtablissement: function (callback) {
      readFile('detailsEtablissement.html', callback);
    },
    detailsEDT: function (callback) {
      readFile('detailsEDT.html', callback);
    },
    detailsCV: function (callback) {
      readFile('detailsCV.html', callback);
    },
    aidantDemarche: function(callback){
      readFile('aidantDemarche.html', callback);
    },
    requestIdentites: function(callback) {
      var identites = request.formAnswers.identites;
      formatDateNaissance(identites.beneficiaire);
      if(identites.autorite){
        formatDateNaissance(identites.autorite.parent1);
        formatDateNaissance(identites.autorite.parent2);
      }

      callback(null, identites);
    },
    trajectoires: function(callback) {
      var trajectoires = computeTrajectoires(request);
      callback(null, trajectoires);
    },
    mdph: function (callback) {
      if (!request.mdph) {
        callback(null, []);
      }
      callback(null, request.mdph);
    }
  },
  function(err, results){
    if (err) { next(err); }
    var subTemplates = _.omit(results, 'answersTemplate', 'trajectoires', 'requestIdentites');
    var html = mustache.render(
      results.answersTemplate,
      {path: path, sections: results.trajectoires, identites: results.requestIdentites, mdph: results.mdph},
      subTemplates
    );
    next(null, html);
  });
};
