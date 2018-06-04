'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'demande.vie_scolaire';

    $stateProvider.state(index + '.vos_attentes', {
      url: '',
      template: '<div ui-view></div>',
      abstract: true
    })
    .state(index + '.vos_attentes.scolarite', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'attentesVieScolaire', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.structure');
          };
        }
      }
    })
    .state(index + '.vos_attentes.structure', {
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
          return QuestionService.get(section, 'structure', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.referent');
          };
        }
      }
    })
    .state(index + '.vos_attentes.referent', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'referent', demande);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.autres_renseignements');
          };
        }
      }
    })
    .state(index + '.vos_attentes.autres_renseignements', {
      url: '',
      templateUrl: 'components/question/autres_renseignements.html',
      controller: 'RenseignementsQuestionCtrl',
      data: {
        isLastQuestion: true
      },
      authenticate: true,
      authorized: ['user'],
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
