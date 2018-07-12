'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    var index = 'demande.vie_quotidienne.vos_besoins';
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
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'besoinsVie', demande);
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
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'besoinsDeplacement', demande);
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
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'besoinsTransports', demande);
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
      authenticate: true,
      authorized: ['user'],
      protected: true,
      resolve: {
        question: function(QuestionService, section, demande) {
          return QuestionService.get(section, 'besoinsSocial', demande);
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
