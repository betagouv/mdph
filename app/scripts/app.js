'use strict';

/**
 * @ngdoc overview
 * @name impactApp
 * @description
 * # impactApp
 *
 * Main module of the application.
 */
angular
  .module('impactApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    // route to show our basic form (/questionnaire)
    .state('q', {
      url: '/questionnaire',
      templateUrl: 'views/questionnaire.html',
      controller: 'QuestionCtrl'
    })

    // nested states 
    // each of these sections will have their own view
    .state('q.disclaimer', {
      url: '/disclaimer',
      templateUrl: 'views/questions/disclaimer.html'
    })

    .state('q.dossier', {
      url: '/dossier',
      templateUrl: 'views/questions/dossier.html',
      controller: function($scope, $state) {
        $scope.nextStep = function() {
          $state.go('q.vie_quotidienne.logement_global');
        };
      }
    })

    .state('q.renouvellement', {
      url: '/renouvellement',
      templateUrl: 'views/questions/renouvellement.html'
    })

    // inutilise pour le moment, a faire a la fin du questionnaire
    .state('q.representant', {
      url: '/representant',
      templateUrl: 'views/questions/representant.html'
    })

    .state('q.vie_quotidienne', {
      abstract: true,
      url: '/vie_quotidienne',
      templateUrl: 'views/questions/vie_quotidienne.html'
    })

    .state('q.vie_quotidienne.logement_global', {
      url: '/logement_global',
      templateUrl: 'views/questions/vie_quotidienne/logement_global.html'
    });

    // catch all route
    // send users to the home page
    $urlRouterProvider.otherwise('/questionnaire/disclaimer');

});