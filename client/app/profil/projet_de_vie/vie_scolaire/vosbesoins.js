'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'profil.vie_scolaire';

    $stateProvider.state(index + '.vos_besoins', {
      url: '/vos_besoins',
      template: '<ui-view/>',
      controller: function($scope) {
        $scope.helpTemplate = 'components/help/besoins.html';
      },

      abstract: true

    }).state(index + '.vos_besoins.scolarite', {
      url: '/scolarite',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsScolarite', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.communication');
          };
        }
      }
    }).state(index + '.vos_besoins.communication', {
      url: '/communication',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsCommunication', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.entretien');
          };
        }
      }
    }).state(index + '.vos_besoins.entretien', {
      url: '/entretien',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsEntretien', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.deplacement');
          };
        }
      }
    }).state(index + '.vos_besoins.deplacement', {
      url: '/deplacement',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, section, profile) {
          return QuestionService.get(section, 'besoinsDeplacement', profile);
        },

        nextStep: function($state) {
          return function() {
            $state.go('profil.vie_scolaire.vos_attentes.scolarite');
          };
        }
      }
    });
  });
