'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'profil.vie_scolaire';

    $stateProvider.state(index + '.vos_besoins', {
      url: '',
      template: '<div ui-view></div>',
      controller: function($scope) {
        $scope.helpTemplate = 'components/help/besoins.html';
      },

      abstract: true

    }).state(index + '.vos_besoins.scolarite', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsScolarite', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.communication');
          };
        }
      }
    }).state(index + '.vos_besoins.communication', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsCommunication', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.entretien');
          };
        }
      }
    }).state(index + '.vos_besoins.entretien', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsEntretien', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('^.deplacement');
          };
        }
      }
    }).state(index + '.vos_besoins.deplacement', {
      url: '',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      authenticate: true,
      authorized: ['user'],
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsDeplacement', profile);
        },

        nextStep: function($state, saveCurrentState) {
          return function() {
            saveCurrentState();
            $state.go('profil.vie_scolaire.vos_attentes.scolarite');
          };
        }
      }
    });
  });
