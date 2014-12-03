'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EnvoiCtrl
 * @description
 * # EnvoiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EnvoiCtrl', function($scope, $state, $http, $modal, Auth, DroitService, FormService, RequestService, prestations, QuestionService) {

    $scope.justificatifStr = FormService.estRepresentant($scope.formAnswers) ?
      'de votre justificatif d\'identité ainsi que celui de la personne handicapée' :
      'de votre justificatif d\'identité';

    $scope.prestations = DroitService.compute($scope.formAnswers, prestations);
    $scope.showAdult = FormService.isAdult($scope.formAnswers);

    $scope.getQuestionAnswerHtml = function(question, answer, section) {
      var questionAnswer = getQuestionAnswer(question, answer, section);
      if (questionAnswer && questionAnswer.answer) {
        if (questionAnswer.type === 'radio') {
          var radioBuilder = questionAnswer.title + ' : ' + questionAnswer.answer.value;
          if (questionAnswer.answer.detail) {
            radioBuilder += '<ul><li>' + questionAnswer.answer.detail + '</ul></li>';
          }
          return radioBuilder;
        }
        else if (questionAnswer.type === 'checkbox') {
          var checkboxBuilder = questionAnswer.title +'<ul>';
          angular.forEach(questionAnswer.answer, function(checkboxAnswer){
            checkboxBuilder += '<li>' + checkboxAnswer.value + '</li>';
            if(checkboxAnswer.detail){
              checkboxBuilder += '<ul><li>' + checkboxAnswer.detail + '</ul></li>';
            }
          });

          checkboxBuilder += '</ul>';
          return checkboxBuilder;
        }
        else if (questionAnswer.type === 'text') {
          return questionAnswer.title + ' : ' + questionAnswer.answer.value;
        }
        else if (questionAnswer.type === 'employeur') {
          return (questionAnswer.title
            + '<ul><li>' + questionAnswer.answer.value.nom.label + ' : ' + questionAnswer.answer.value.nom.value
            + '</li><li>' + questionAnswer.answer.value.adresse.label + ' : ' + questionAnswer.answer.value.adresse.value
            + '</li><li>' + questionAnswer.answer.value.medecin.label + ' : ' + questionAnswer.answer.value.medecin.value
            + '</li></ul>');
        }
        else if (questionAnswer.type === 'structure'){
          var structureBuilder = questionAnswer.title +'<ul>';
          for(var i = 0 ; i < questionAnswer.answer.value.structures.length ; i++){
            structureBuilder += '<li>' + questionAnswer.answer.value.structures[i].name + '</li>';
          }
          structureBuilder += '</ul>';
          return structureBuilder;
        }

        return '';

      }
    };

    var getQuestionAnswer = function(question, answer, section) {
      var questionAnswer = {};

      if (section === 'contexte' && question === 'demandeur') {
        return 'Détails du demandeur';
      }
      var questionConstant = QuestionService.get(section, question, $scope.formAnswers);
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
            questionAnswer.answer.detail = getDetailAnswer(section, questionConstant, answerConstant);
          }
        });
      }
      else if (questionConstant.type === 'checkbox') {
        questionAnswer.answer = [];
        angular.forEach(questionConstant.answers, function(answerConstant) {
          if (answer[answerConstant.model]) {
            var checkboxAnswer = {};
            checkboxAnswer.value = answerConstant.label;
            checkboxAnswer.detail = getDetailAnswer(section, questionConstant, answerConstant);
            questionAnswer.answer.push(checkboxAnswer);
          }
        });
      }
      else if (questionConstant.type === 'text') {
        questionAnswer.answer = {};
        questionAnswer.answer.value = answer;
      }
      else if (questionConstant.type === 'employeur') {
        questionAnswer.answer = {};
        questionAnswer.answer.value = answer;
      }
      else if (questionConstant.type === 'structure') {
        questionAnswer.answer = {};
        questionAnswer.answer.value = answer;
      }

      return questionAnswer;
    };

    var getDetailAnswer = function(section, questionConstant, answerConstant) {
      if (answerConstant.detailModel && $scope.formAnswers[section][answerConstant.detailModel]) {
        return $scope.formAnswers[section][answerConstant.detailModel];
      }
      return null;
    };

    $scope.saveForm = function() {
      if (Auth.isLoggedIn()) {
        RequestService.getCurrent(function(request) {
          RequestService.saveCurrentForm(request);
        });
      } else {
        $state.go('questionnaire.projet_de_vie.envoi.modal.login');
      }
    };

  });
