'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'espace_perso.mes_profils.profil.vie_quotidienne.vos_attentes';
    $stateProvider.state(index, {
      url: '/vos_attentes',
      template: '<ui-view/>',
      abstract: true
    }).state(index + '.type_aide', {
      url: '/type_aide',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'attentesTypeAide', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.structure');
          };
        }
      }
    }).state(index + '.structure', {
      url: '/structure',
      templateUrl: 'components/question/structure.html',
      controller: 'StructureQuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'structures', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.autres_renseignements');
          };
        }
      }
    }).state(index + '.autres_renseignements', {
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
