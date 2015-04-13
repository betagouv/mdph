'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.demande.vie_quotidienne.vos_besoins';
    $stateProvider.state(index, {
      url: '/vos_besoins',
      template: '<ui-view/>',
      controller: function ($scope) {
        $scope.helpTemplate = 'components/help/besoins.html';
      },
      abstract: true
    }).state(index + '.quotidien', {
      url: '/quotidien',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'besoinsVie', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.deplacement');
          };
        }
      }
    }).state(index + '.deplacement', {
      url: '/deplacement',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'besoinsDeplacement', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.transport');
          };
        }
      }
    }).state(index + '.transport', {
      url: '/transport',
      templateUrl: 'components/question/radio.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'besoinsTransports', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.social');
          };
        }
      }
    }).state(index + '.social', {
      url: '/social',
      templateUrl: 'components/question/checkbox.html',
      controller: 'QuestionCtrl',
      resolve: {
        question: function(QuestionService, request, section) {
          return QuestionService.get(section, 'besoinsSocial', request.formAnswers);
        },
        nextStep: function($state) {
          return function() {
            $state.go('^.^.vos_attentes.type_aide');
          };
        }
      }
    });
  });
