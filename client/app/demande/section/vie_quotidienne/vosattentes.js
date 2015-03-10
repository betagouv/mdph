'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.vie_quotidienne';
    $stateProvider.state(index + '.vos_attentes', {
      url: '/vos_attentes',
      template: '<ui-view/>',
      abstract: true
    }).state(index + '.vos_attentes.type_aide', {
      url: '/type_aide',
      templateUrl: 'components/question/checkbox.html',
      controller: 'CheckboxQuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'attentesTypeAide', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.structure');
          };
        }
      }
    }).state(index + '.vos_attentes.structure', {
      url: '/structure',
      templateUrl: 'components/question/structure.html',
      controller: 'StructureQuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'structures', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.autres_renseignements');
          };
        }
      }
    }).state(index + '.vos_attentes.autres_renseignements', {
      url: '/autres_renseignements',
      templateUrl: 'components/question/autres_renseignements.html',
      controller: 'RenseignementsQuestionCtrl',
      data: {
        isLastQuestion: true
      },
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'autresRenseignements', request.formAnswers);
        },
        nextStep: function(saveSection) {
          return function() {
            saveSection();
          };
        }
      }
    });
  });
