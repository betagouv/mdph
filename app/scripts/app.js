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
      templateUrl: 'views/partials/question_radio.html',
      controller: 'DossierCtrl'
    })

    .state('q.renouvellement', {
      url: '/renouvellement',
      templateUrl: 'views/partials/question_radio.html',
      controller: 'RenouvellementCtrl'
    })

    .state('q.representant', {
      url: '/representant',
      templateUrl: 'views/partials/question_radio.html',
      controller: 'RepresentantCtrl'
    })

    .state('q.date_naissance', {
      url: '/date_naissance',
      templateUrl: 'views/partials/question_date.html',
      controller: 'DateNaissanceCtrl'
    })

    .state('q.vie_quotidienne', {
      abstract: true,
      url: '/vie_quotidienne',
      templateUrl: 'views/questions/vie_quotidienne.html'
    })

    .state('q.vie_quotidienne.logement_global', {
      url: '/logement_global',
      templateUrl: 'views/partials/question_radio.html',
      controller: 'LogementGlobalCtrl'
    })
    .state('q.vie_quotidienne.logement_global.autre', {
      templateUrl: 'views/partials/form_precisez.html'
    })

    .state('q.vie_quotidienne.logement_detail', {
      url: '/logement_detail',
      templateUrl: 'views/partials/question_radio.html',
      controller: 'LogementDetailCtrl'
    })
    .state('q.vie_quotidienne.logement_detail.independant', {
      templateUrl: 'views/questions/vie_quotidienne/logement_detail_independant.html'
    })
    .state('q.vie_quotidienne.logement_detail.domicile', {
      templateUrl: 'views/questions/vie_quotidienne/logement_detail_domicile.html'
    })
    .state('q.vie_quotidienne.logement_detail.etablissement', {
      templateUrl: 'views/partials/form_precisez.html'
    })
    .state('q.vie_quotidienne.logement_detail.autre', {
      templateUrl: 'views/partials/form_precisez.html'
    });

    // catch all route
    // send users to the home page
    $urlRouterProvider.otherwise('/questionnaire/disclaimer');

});