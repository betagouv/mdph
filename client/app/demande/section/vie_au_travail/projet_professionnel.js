'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.vie_au_travail';

    $stateProvider.state(index + '.projet_professionnel', {
      url: '/projet_professionnel',
      template: '<ui-view/>',
      abstract: true
    })
    .state(index + '.projet_professionnel.description', {
      url: '/description',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      data: {
        hideBack: true
      },
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('travail', 'description', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.besoin_soutien');
          };
        }
      }
    })
    .state(index + '.projet_professionnel.besoin_soutien', {
      url: '/besoin_soutien',
      templateUrl: 'components/question/checkbox.html',
      controller: 'CheckboxQuestionCtrl',
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('travail', 'besoinSoutien', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.structure');
          };
        }
      }
    })
    .state(index + '.projet_professionnel.structure', {
      url: '/structure',
      templateUrl: 'components/question/structure.html',
      controller: 'StructureQuestionCtrl',
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('travail', 'structure', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.autres_renseignements');
          };
        }
      }
    })
    .state(index + '.projet_professionnel.autres_renseignements', {
      url: '/autres_renseignements',
      templateUrl: 'components/question/autres_renseignements.html',
      controller: 'RenseignementsQuestionCtrl',
      data: {
        isLastQuestion: true
      },
      resolve: {
        question: function(QuestionService, request) {
          return QuestionService.get('travail', 'autresRenseignements', request.formAnswers);
        },
        nextStep: function(saveSection) {
          return function() {
            saveSection();
          };
        }
      }
    });
  });
