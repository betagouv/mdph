'use strict';
// jshint multistr:true

angular.module('impactApp')
  .factory('RecapitulatifService', function RecapitulatifService($http, $window, $location, SectionConstants, QuestionService) {
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

          return '<div class="question"><p>' + radioBuilder + '</p></div>';
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
          return '<div class="question"><p>' + checkboxBuilder + '</p></div>';
        }
        else if (questionAnswer.type === 'text') {
          return '<div class="question"><p>' + questionAnswer.title + ' : ' + questionAnswer.answer.value + '</p></div>';
        }
        else if (questionAnswer.type === 'date') {
          return '<div class="question"><p>' + questionAnswer.title + ' : ' + moment(questionAnswer.answer.value).format('DD/MM/YYYY') + '</p></div>';
        }
        else if (questionAnswer.type === 'employeur') {
          return ('<div class="question"><p>' + questionAnswer.title +
            '<ul><li>' + questionAnswer.answer.value.nom.label + ' : ' + questionAnswer.answer.value.nom.value +
            '</li><li>' + questionAnswer.answer.value.adresse.label + ' : ' + questionAnswer.answer.value.adresse.value  +
            '</li><li>' + questionAnswer.answer.value.medecin.label + ' : ' + questionAnswer.answer.value.medecin.value  +
            '</li></ul></p></div>');
        }
        else if (questionAnswer.type === 'structure'){
          var structureBuilder = questionAnswer.title +'<ul>';
          for(var i = 0 ; i < questionAnswer.answer.value.structures.length ; i++){
            structureBuilder += '<li>' + questionAnswer.answer.value.structures[i].name + '</li>';
          }
          structureBuilder += '</ul>';
          return '<div class="question"><p>' + structureBuilder + '</p></div>';
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

      var html = '<div class="section"><h2>' + section.label + '</h2>';
      var sectionAnswers = answers[section.id];

      if (!sectionAnswers) {
        return html + '<p><em>Section non renseignée</em></p></div>';
      }

      if (section.id === 'aidant' && !sectionAnswers.condition) {
        return html + '<p><em>Vous avez choisi de ne pas renseigner de détails sur votre aidant familial</em></p></div>';
      }

      angular.forEach(sectionAnswers, function(answer, question) {
        var questionHtml = questionToHtml(answer, question, section.id, request);
        if (questionHtml) {
          html += questionToHtml(answer, question, section.id, request) + '<br>';
        }
      });

      return html + '</div>';
    };

    var answersToHtml = function(request) {
      var path =  'http://' + $location.host();
      if($location.host()==='localhost'){
        path += ':' + $location.port();
      }
      var html = '<html>\
        <head>\
          <style>\
            h1 {\
              text-align: center;\
              font-size: 34px;\
              color: #4f6083;\
            }\
            h2 {\
              font-size: 28px;\
              color: #323d53;\
            }\
            p {\
              font-size: 24px;\
            }\
            ul {\
              font-size: 24px;\
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
          <img src="'+ path +'/assets/images/cerfa.png" width="91,4" height="48,9"></img>\
          <img src="'+ path +'/assets/images/logo59.jpg" width="88,9" height="48,9"></img>\
          <h1>Mes réponses au questionaire MDPH</h1>\
          <p><strong>Les informations que je donne sont confidentielles.\
          <br>Je peux demander à rencontrer la CDAPH.</strong>\
          La CDAPH, c’est la Commission des Droits et de l’Autonomie des Personnes Handicapées. Créée par la loi 2005-102 du 11 février\
          2005, elle prend les décisions d’attribution des droits aux personnes avec un handicap sur la base de l’évaluation et des propositions\
          de la MDPH.\
          <br><strong>Une évaluation approfondie va être réalisée par l’équipe de la MDPH, qui vous recontactera si nécessaire.\
          Nous vous conseillons de conserver une copie de vos réponses.</strong></p>';

      angular.forEach(SectionConstants, function(section) {
        html += sectionToHtml(section, request);
      });
      return html + '</body></html>';
    };

    return {
      answersToHtml: function(request) {
        return answersToHtml(request);
      },

      telechargerPdf: function(request) {
        $http.post(
          'api/requests/' + request.shortId + '/html_answers.pdf',
          { htmlAnswers: answersToHtml(request) },
          { responseType: 'arraybuffer' })
        .success(function(data) {
          var file = new Blob([data], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          $window.open(fileURL);
        });
      }
    };
  });
