'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'demande.vie_au_travail';

    $stateProvider.state(index + '.projet_professionnel', {
      url: '',
      template: '<div ui-view></div>',
      abstract: true
    })
    .state(index + '.projet_professionnel.description', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'description', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.besoin_soutien');
          };
        }
      }
    })
    .state(index + '.projet_professionnel.besoin_soutien', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'besoinSoutien', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.structure');
          };
        }
      }
    })
    .state(index + '.projet_professionnel.structure', {
      url: '',
      templateUrl: 'components/question/structure.html',
      controller: 'ListQuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        listName: function() {
          return 'structures';
        },

        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'structures', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.autres_renseignements');
          };
        }
      }
    })
    .state(index + '.projet_professionnel.autres_renseignements', {
      url: '',
      templateUrl: 'components/question/autres_renseignements.html',
      controller: 'RenseignementsQuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      data: {
        isLastQuestion: true
      },
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'autresRenseignements', demande);
        },

        nextStep: function(saveSection) {
          return function() {
            saveSection();
          };
        }
      }
    });
  });
