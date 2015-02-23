'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.aidant.vos_attentes';

    $stateProvider
      .state(index, {
        url: '/vos_attentes',
        template: '<ui-view/>',
        abstract: true
      })
      .state(index + '.type_attente', {
        url: '/type_attente',
        templateUrl: 'components/question/checkbox.html',
        controller: 'CheckboxQuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'typeAttente', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.structure');
            };
          }
        }
      })
      .state(index + '.structure', {
        url: '/structure',
        templateUrl: 'components/question/structure.html',
        controller: 'StructureQuestionCtrl',
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'structure', request.formAnswers);
          },
          nextStep: function($state) {
            return function() {
              $state.go('^.autres_renseignements');
            };
          }
        }
      })
      .state(index + '.autres_renseignements', {
        url: '/autres_renseignements',
        templateUrl: 'components/question/autres_renseignements.html',
        controller: 'RenseignementsQuestionCtrl',
        data: {
          isLastQuestion: true
        },
        resolve: {
          question: function(QuestionService, request) {
            return QuestionService.get('aidant', 'autresRenseignements', request.formAnswers);
          },
          nextStep: function(saveSection) {
            return function() {
              saveSection();
            };
          }
        }
      });
  });
