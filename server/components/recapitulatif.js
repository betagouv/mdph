'use strict';

/* jshint multistr: true */

var _ = require('lodash');
var os = require('os');
var fs = require('fs');
var path = require('path')
var async = require('async');
var moment = require('moment');
var mustache = require('mustache');

var Sections = require('../api/question/sections.constant');
var QuestionsBySections = require('../api/question/question.controller').questionsBySections;

var questionToHtml = function(answer, question, sectionId, request) {
  var html = '<div class="question">'

  html += '<h3>' + question.titleDefault + '</h3>';

  if (!question.answers) {
    console.log(question);
  } else {
    question.answers.forEach(function(constant) {
      if (answer[constant.model]) {
        html += '<p>' + constant.label + '</p>';
      }
    });
  }

  html += '</div>';

  return html;
};

var sectionToHtml = function(section, request) {
  var answers = request.formAnswers;

  // if (section.id === 'identites') {
  //   return Identites.sectionToHtml(answers.identites);
  // }

  if (section.id === 'documents') {
    return '';
  }

  var html = '<div class="section">'

  html += '<h2>' + section.label + '</h2>';

  var sectionAnswers = answers[section.id];
  var sectionQuestions = QuestionsBySections[section.id];

  if (!sectionAnswers) {
    return html + '<div class="question"><p>Section non renseignée</p></div>';
  }

  if (section.id === 'aidant' && !sectionAnswers.condition) {
    return html + '<p>Vous avez choisi de ne pas renseigner de détails sur votre aidant familial</p>';
  }

  sectionQuestions.forEach(function(question) {
    var answer = sectionAnswers[question.model];
    if (!answer) {
      return;
    }
    var questionHtml = questionToHtml(answer, question);
    if (questionHtml) {
      html += questionHtml + '<br>';
    }
  });

  return html + '</div>';
};

var readFile = function(name, callback) {
  fs.readFile(path.join(__dirname, 'templates', name), function (err, html) {
    callback(err, String(html));
  });
}

var formatDateNaissance = function(identite) {
  if (identite && identite.dateNaissance) {
    identite.dateNaissance = moment(identite.dateNaissance).format('DD/MM/YYYY');
  }
}

var matchAnswersToQuestions = function(question, answer){
  var answersAndQuestions = _.filter(question.answers, function(constant) {
    if (typeof answer === 'string') {
      return answer === constant.model;
    } else {
      return answer[constant.model] === true;
    }
  });
  if(question.type === 'text'){
    answersAndQuestions.push({
      label: answer
    });
  }

  else {
    if(answer.listeFrais){
      answersAndQuestions.push({
        label: 'Liste des frais',
        model: 'fraisHandicap',
        detailModel: 'listeFrais'
      });
    }
  }

  return answersAndQuestions;
}

exports.answersToHtml = function(request, path, output, next) {
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
      var toutesTrajectoires = Sections.trajectoires;
      var trajectoires = [];

      toutesTrajectoires.forEach(function(trajectoire) {
        var questions = [];
        var answers = request.formAnswers[trajectoire.id];
        if (answers) {
          var toutesQuestions = QuestionsBySections[trajectoire.id];
          toutesQuestions.forEach(function(question) {

            var answer = answers[question.model];
            if (answer) {
              var filteredAnswers = matchAnswersToQuestions(question, answer);

              filteredAnswers.forEach(function(rawAnswer){
                if(rawAnswer.detailModel){
                  if(answer[rawAnswer.detailModel]){
                    if(typeof answer[rawAnswer.detailModel] === 'object'){
                      rawAnswer.details = [];
                      rawAnswer.detailsObject = [];
                      rawAnswer.detailsFrais = [];
                      _.forEach(answer[rawAnswer.detailModel], function(n, key){
                        if(n){
                          if(typeof key === 'number'){
                            rawAnswer.detailsFrais.push(n)
                          }
                          else {
                            if(typeof n === 'object'){
                              if(n.value)
                                rawAnswer.detailsObject.push({'label' : key, 'detail' : n.detail});
                            }
                            else {
                              rawAnswer.details.push(key);
                            }
                          }
                        }
                      });
                    }
                    else {
                      rawAnswer.detail = answer[rawAnswer.detailModel];
                    }

                  }
                  else {
                    rawAnswer.detail = answers[rawAnswer.detailModel];
                  }
                }
              });
              question.answers = filteredAnswers;
              questions.push(question)
            }
          });

          if (questions.length > 0) {
            trajectoire.questions = questions;
            trajectoires.push(trajectoire);
          }
        }
      });

      callback(null, trajectoires);
    }
  },
  function(err, results){
    if (err) { next(err); }
    var ansersTemplate = results.answersTemplate;
    var subTemplates = _.omit(results, 'answersTemplate', 'trajectoires', 'requestIdentites');
    var html = mustache.render(
      results.answersTemplate,
      {path: path, sections: results.trajectoires, identites: results.requestIdentites},
      subTemplates
    );
    next(null, html);
  });
};
