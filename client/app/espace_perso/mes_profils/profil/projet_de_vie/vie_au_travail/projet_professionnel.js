'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'espace_perso.mes_profils.profil.vie_au_travail';

    $stateProvider.state(index + '.projet_professionnel', {
      url: '/projet_professionnel',
      template: '<ui-view/>',
      abstract: true
    })
    .state(index + '.projet_professionnel.description', {
      url: '/description',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'description', profile);
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
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinSoutien', profile);
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
      controller: 'ListQuestionCtrl',
      resolve: {
        listName: function() {
          return 'structures';
        },

        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'structures', profile);
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
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'autresRenseignements', profile);
        },

        nextStep: function(saveSection) {
          return function() {
            saveSection();
          };
        }
      }
    });
  });
