'use strict';

/* jshint multistr: true */

var _ = require('lodash');
var moment = require('moment');
var Sections = require('../api/question/sections.constant');
var QuestionsBySections = require('../api/question/question.controller').questionsBySections;
var Identites = require('./identites');
var os = require("os");

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

  if (section.id === 'identites') {
    return Identites.sectionToHtml(answers.identites);
  }

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

exports.answersToHtml = function(request, path) {
  var html = '<html>\
    <head>\
      <style>\
        h1 {\
          text-align: center;\
          font-size: 17px;\
          color: #4f6083;\
        }\
        h2 {\
          font-size: 14px;\
          color: #323d53;\
        }\
        p {\
          font-size: 12px;\
        }\
        ul {\
          font-size: 12px;\
        }\
        .section {\
          color: #333;\
          background-color: #F5F5F5;\
          padding: 2px 10px;\
          border-radius: 5px;\
          margin: 5px 0px;\
        }\
        .question {\
          background-color: white;\
          padding: 2px 16px;\
          border-radius: 6px;\
        }\
        img {\
          float: right;\
          margin-right: 5px;\
        }\
      </style>\
    </head>\
    <body>\
      <img src="http://'+ path +'/assets/images/cerfa.png" width="91,4" height="48,9"></img>\
      <img src="http://'+ path +'/assets/images/logo59.jpg" width="88,9" height="48,9"></img>\
      <h1>Mes réponses au questionaire MDPH</h1>\
      <p><strong>Les informations que je donne sont confidentielles.\
      <br>Je peux demander à rencontrer la CDAPH.</strong>\
      La CDAPH, c’est la Commission des Droits et de l’Autonomie des Personnes Handicapées. Créée par la loi 2005-102 du 11 février\
      2005, elle prend les décisions d’attribution des droits aux personnes avec un handicap sur la base de l’évaluation et des propositions\
      de la MDPH.\
      <br><strong>Une évaluation approfondie va être réalisée par l’équipe de la MDPH, qui vous recontactera si nécessaire.\
      Nous vous conseillons de conserver une copie de vos réponses.</strong></p>';

  Sections.all.forEach(function(section) {
    html += sectionToHtml(section, request);
  });

  return html + '</body></html>';
};
