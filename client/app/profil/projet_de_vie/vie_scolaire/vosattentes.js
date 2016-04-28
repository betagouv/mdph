'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'profil.vie_scolaire';

    $stateProvider.state(index + '.vos_attentes', {
      url: '/vos_attentes',
      template: '<ui-view/>',
      abstract: true
    })
    .state(index + '.vos_attentes.scolarite', {
      url: '/scolarite',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'attentesVieScolaire', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.structure');
          };
        }
      }
    })
    .state(index + '.vos_attentes.structure', {
      url: '',
      templateUrl: 'components/question/structure.html',
      controller: 'ListQuestionCtrl',
      resolve: {
        listName: function() {
          return 'structures';
        },

        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'structure', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.referent');
          };
        }
      }
    })
    .state(index + '.vos_attentes.referent', {
      url: '/enseignant_referent',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'referent', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.autres_renseignements');
          };
        }
      }
    })
    .state(index + '.vos_attentes.autres_renseignements', {
      url: '/autres_renseignements',
      templateUrl: 'components/question/autres_renseignements.html',
      controller: 'RenseignementsQuestionCtrl',
      data: {
        isLastQuestion: true
      },
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'vieScolaireAutresRenseignements', profile);
        },

        nextStep: function(saveSection) {
          return function() {
            saveSection();
          };
        }
      }
    });
  });
