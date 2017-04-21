'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'profil.vie_quotidienne.vos_besoins';
    $stateProvider.state(index, {
      url: '',
      template: '<div ui-view></div>',
      controller: function($scope) {
        $scope.helpTemplate = 'components/help/besoins.html';
      },

      redirectTo: index + '.quotidien',
    }).state(index + '.quotidien', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsVie', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.deplacement');
          };
        }
      }
    }).state(index + '.deplacement', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsDeplacement', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.transport');
          };
        }
      }
    }).state(index + '.transport', {
      url: '',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsTransports', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.social');
          };
        }
      }
    }).state(index + '.social', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsSocial', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.^.vos_attentes.type_aide');
          };
        }
      }
    });
  });
