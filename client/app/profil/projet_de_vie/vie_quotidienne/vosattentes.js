'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.vie_quotidienne.vos_attentes';
    $stateProvider.state(index, {
      url: '',
      template: '<div ui-view></div>',
      abstract: true
    }).state(index + '.type_aide', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'attentesTypeAide', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState($state);
            $state.go('^.structure');
          };
        }
      }
    }).state(index + '.structure', {
      url: '',
      templateUrl: 'components/question/structure.html',
      controller: 'ListQuestionCtrl',
      resolve: {
        listName: function() {
          return 'structures';
        },

        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'structures', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState($state);
            $state.go('^.autres_renseignements');
          };
        }
      }
    }).state(index + '.autres_renseignements', {
      url: '',
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
