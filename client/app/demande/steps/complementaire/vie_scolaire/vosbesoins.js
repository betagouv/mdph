'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {

    var index = 'departement.demande.complementaire.vie_scolaire';

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
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'besoinsScolarite', request.formAnswers);
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
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'besoinsCommunication', request.formAnswers);
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
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'besoinsEntretien', request.formAnswers);
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
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'besoinsDeplacement', request.formAnswers);
        },

        nextStep: function($state) {
          return function() {
            $state.go('^.^.vos_attentes.scolarite');
          };
        }
      }
    });
  });
