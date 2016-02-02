'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'espace_perso.mes_profils.profil.aidant.vos_attentes';

    $stateProvider.state(index, {
      url: '/vos_attentes',
      template: '<ui-view/>',
      abstract: true
    })
    .state(index + '.type_attente', {
      url: '/type_attente',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, sectionModel) {
          return QuestionService.get(section, 'typeAttente', sectionModel);
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
        question: function(QuestionService, section, sectionModel) {
          return QuestionService.get(section, 'structures', sectionModel);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.renseignements');
          };
        }
      }
    })
    .state(index + '.renseignements', {
      url: '/renseignements',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, sectionModel) {
          return QuestionService.get(section, 'demandesAides', sectionModel);
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
        question: function(QuestionService, section, sectionModel) {
          return QuestionService.get(section, 'autresRenseignements', sectionModel);
        },

        nextStep: function(saveSection) {
          return function() {
            saveSection();
          };
        }
      }
    });
  });
