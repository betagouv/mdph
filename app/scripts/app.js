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
    'ui.bootstrap',
    'ui.router.stateHelper'
  ])
  .config(function (stateHelperProvider, $urlRouterProvider) {
    stateHelperProvider.setNestedState({
      name: 'form',
      url: '/questionnaire',
      controller: 'FormCtrl',
      templateUrl: 'views/form.html',
      children: [
        {
          name: 'conditions',
          url: '/conditions',
          templateUrl: 'views/conditions.html'
        },
        {
          name: 'dossier',
          url: '/dossier',
          templateUrl: 'views/partials/question_radio.html',
          controller: 'DossierCtrl'
        },
        {
          name: 'renouvellement',
          url: '/renouvellement',
          templateUrl: 'views/partials/question_radio.html',
          controller: 'RenouvellementCtrl'
        },
        {
          name: 'representant',
          url: '/representant',
          templateUrl: 'views/partials/question_radio.html',
          controller: 'RepresentantCtrl'
        },
        {
          name: 'date_naissance',
          url: '/date_naissance',
          templateUrl: 'views/partials/question_date.html',
          controller: 'DateNaissanceCtrl'
        },
        {
          name: 'vie_quotidienne',
          url: '/vie_quotidienne',
          template: '<div id="form-views" ui-view></div>',
          abstract: true,
          children: [
            {
              name: 'vie_famille',
              url: '/vie_famille',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'VieFamilleCtrl',
              children: [
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez.html'
                }
              ]
            },
            {
              name: 'logement',
              url: '/logement',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'LogementCtrl',
              children: [
                {
                  name: 'independant',
                  templateUrl: 'views/partials/details/independant.html'
                },
                {
                  name: 'domicile',
                  templateUrl: 'views/partials/details/domicile.html'
                },
                {
                  name: 'etablissement',
                  templateUrl: 'views/partials/form_precisez.html'
                },
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez.html'
                }
              ]
            }
          ]
        },
        {
          name: 'vos_besoins',
          url: '/vos_besoins',
          template: '<div id="form-views" ui-view></div>',
          abstract: true,
          children: [
            {
              name: 'quotidien',
              url: '/quotidien',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'BesoinsQuotidienCtrl',
              children: [
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez.html',
                }
              ]
            }
          ]
        }
      ]
    });

    // catch all route
    // send users to the home page
    $urlRouterProvider.otherwise('/questionnaire/conditions');

});
