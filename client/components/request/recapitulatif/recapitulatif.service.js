'use strict';
// jshint multistr:true

angular.module('impactApp')
  .factory('RecapitulatifService', function RecapitulatifService(SectionConstants, QuestionService) {

    var getQuestionAnswer = function(question, answer, sectionId, request) {
      var answers = request.formAnswers;
      var questionAnswer = {};

      if (sectionId === 'contexte' && question === 'demandeur') {
        return 'Détails du demandeur';
      }
      var questionConstant = QuestionService.get(sectionId, question, answers);
      if (!questionConstant) {
        return;
      }
      questionAnswer.title = questionConstant.title;
      questionAnswer.type = questionConstant.type;

      if (questionConstant.type === 'radio') {
        angular.forEach(questionConstant.answers, function(answerConstant) {
          if (answerConstant.value === answer) {
            questionAnswer.answer = {};
            questionAnswer.answer.value = answerConstant.label;
            questionAnswer.answer.detail = getDetailAnswer(sectionId, questionConstant, answerConstant, request);
            questionAnswer.answer.detailType = getDetailType(sectionId, questionConstant, answerConstant, request);
          }
        });
      }
      else if (questionConstant.type === 'checkbox') {
        questionAnswer.answer = [];
        angular.forEach(questionConstant.answers, function(answerConstant) {
          if (answer[answerConstant.model]) {
            var checkboxAnswer = {};
            checkboxAnswer.value = answerConstant.label;
            checkboxAnswer.detail = getDetailAnswer(sectionId, questionConstant, answerConstant, request);
            questionAnswer.answer.push(checkboxAnswer);
          }
        });
      }
      else if (questionConstant.type === 'text' ||
          questionConstant.type === 'employeur' ||
          questionConstant.type === 'structure' ||
          questionConstant.type === 'date') {
        questionAnswer.answer = {};
        questionAnswer.answer.value = answer;
      }

      return questionAnswer;
    };

    var getDetailAnswer = function(sectionId, questionConstant, answerConstant, request) {
      if (answerConstant.detailModel && request.formAnswers[sectionId][answerConstant.detailModel]) {
        return request.formAnswers[sectionId][answerConstant.detailModel];
      }
      return null;
    };

    var getDetailType = function(sectionId, questionConstant, answerConstant, request){
      if (answerConstant.detailModel && answerConstant.type  && request.formAnswers[sectionId][answerConstant.detailModel]) {
        return answerConstant.type;
      }
      return null;
    };

    var questionToHtml = function(answer, question, sectionId, request) {

      var questionAnswer = getQuestionAnswer(question, answer, sectionId, request);
      if (questionAnswer && questionAnswer.answer) {
        if (questionAnswer.type === 'radio') {
          var radioBuilder = questionAnswer.title + ' : ' + questionAnswer.answer.value;
          if (questionAnswer.answer.detail) {
            if(questionAnswer.answer.detailType === 'date'){
              radioBuilder += '<ul><li>' + moment(questionAnswer.answer.detail).format('DD/MM/YYYY') + '</li></ul>';
            }
            else {
              radioBuilder += '<ul><li>' + questionAnswer.answer.detail + '</li></ul>';
            }

          }

          return '<p>' + radioBuilder + '</p>';
        }
        else if (questionAnswer.type === 'checkbox') {
          if (!questionAnswer.answer || questionAnswer.answer.length === 0) {
            return '';
          }
          var checkboxBuilder = questionAnswer.title +'<ul>';
          angular.forEach(questionAnswer.answer, function(checkboxAnswer){
            checkboxBuilder += '<li>' + checkboxAnswer.value + '</li>';
            if(checkboxAnswer.detail){
              checkboxBuilder += '<ul><li>' + checkboxAnswer.detail + '</li></ul>';
            }
          });

          checkboxBuilder += '</ul>';
          return '<p>' + checkboxBuilder + '</p>';
        }
        else if (questionAnswer.type === 'text') {
          return '<p>' + questionAnswer.title + ' : ' + questionAnswer.answer.value + '</p>';
        }
        else if (questionAnswer.type === 'date') {
          return '<p>' + questionAnswer.title + ' : ' + moment(questionAnswer.answer.value).format('DD/MM/YYYY') + '</p>';
        }
        else if (questionAnswer.type === 'employeur') {
          return ('<p>' + questionAnswer.title +
            '<ul><li>' + questionAnswer.answer.value.nom.label + ' : ' + questionAnswer.answer.value.nom.value +
            '</li><li>' + questionAnswer.answer.value.adresse.label + ' : ' + questionAnswer.answer.value.adresse.value  +
            '</li><li>' + questionAnswer.answer.value.medecin.label + ' : ' + questionAnswer.answer.value.medecin.value  +
            '</li></ul></p>');
        }
        else if (questionAnswer.type === 'structure'){
          var structureBuilder = questionAnswer.title +'<ul>';
          for(var i = 0 ; i < questionAnswer.answer.value.structures.length ; i++){
            structureBuilder += '<li>' + questionAnswer.answer.value.structures[i].name + '</li>';
          }
          structureBuilder += '</ul>';
          return '<p>' + structureBuilder + '</p>';
        }
      }

      return '';
    };

    var sectionToHtml = function(section, request) {

      if (section.id === 'envoi') {
        return '';
      }

      if (section.id === 'renouvellement' && !request.estRenouvellement) {
        return '';
      }

      var answers = request.formAnswers;

      var html = '<h2>' + section.label + '</h2>';
      var sectionAnswers = answers[section.id];

      if (!sectionAnswers) {
        return html + '<p><em>Section non renseignée</em></p>';
      }

      if (section.id === 'aidant' && !sectionAnswers.condition) {
        return html + '<p><em>Vous avez choisi de ne pas renseigner de détails sur votre aidant familial</em></p>';
      }

      angular.forEach(sectionAnswers, function(answer, question) {
        var questionHtml = questionToHtml(answer, question, section.id, request);
        if (questionHtml) {
          html += questionToHtml(answer, question, section.id, request) + '<br>';
        }
      });

      return html;
    };

    return {
      answersToHtml: function(request) {
        var html = '<html>\
          <head>\
            <style>\
              h1 {\
                font-size: 30px;\
              }\
              h2 {\
                font-size: 28px;\
              }\
              p {\
                font-size: 24px;\
              }\
              ul {\
                font-size: 24px;\
              }\
            </style>\
          </head>\
          <body>\
            <h1>Vos réponses au questionaire MDPH</h1>';
        angular.forEach(SectionConstants, function(section) {
          html += sectionToHtml(section, request);
        });
        return html + '</body></html>';
      }
    };
  });
