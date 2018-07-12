'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'demande.aidant.vos_attentes';

    $stateProvider.state(index, {
      url: '',
      template: '<div ui-view></div>',
      abstract: true
    })
    .state(index + '.type_attente', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'typeAttente', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.structure');
          };
        }
      }
    })
    .state(index + '.structure', {
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
            $state.go('^.renseignements');
          };
        }
      }
    })
    .state(index + '.renseignements', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'demandesAides', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.autres_renseignements');
          };
        }
      }
    })
    .state(index + '.autres_renseignements', {
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
