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
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      // route to show our basic form (/questionnaire)
      .state('questionnaire', {
      url: '/questionnaire',
      templateUrl: 'views/questionnaire.html',
      controller: 'QuestionCtrl'
      })

      // nested states 
      // each of these sections will have their own view
      // url will be nested (/questionnaire/disclaimer)
      .state('questionnaire.disclaimer', {
      url: '/disclaimer',
      templateUrl: 'views/questions/disclaimer.html'
      })

      // url will be nested (/questionnaire/dossier)
      .state('questionnaire.dossier', {
      url: '/dossier',
      templateUrl: 'views/questions/dossier.html'
      })

      // url will be nested (/questionnaire/renouvellement)
      .state('questionnaire.renouvellement', {
      url: '/renouvellement',
      templateUrl: 'views/questions/renouvellement.html'
      });

    // catch all route
    // send users to the home page
    $urlRouterProvider.otherwise('/questionnaire/disclaimer');

});