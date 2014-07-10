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
    'ui.router.stateHelper',
    'angularFileUpload'
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
                  templateUrl: 'views/partials/details/independant.html',
                  controller: function(){}
                },
                {
                  name: 'domicile',
                  templateUrl: 'views/partials/details/domicile.html',
                  controller: function($scope, isAdult) {
                    $scope.showAdult = isAdult($scope.data.dateNaissance);
                  }
                },
                {
                  name: 'etablissement',
                  templateUrl: 'views/partials/form_precisez.html',
                  controller: function(){}
                },
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez.html',
                  controller: function(){}
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
            },
            {
              name: 'deplacement',
              url: '/deplacement',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'BesoinsDeplacementCtrl',
              children: [
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez.html',
                }
              ]
            },
            {
              name: 'social',
              url: '/social',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'BesoinsSocialCtrl',
              children: [
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez.html',
                }
              ]
            },
            {
              name: 'lieu_de_vie',
              url: '/lieu_de_vie',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'BesoinsLieuDeVieCtrl',
              children: [
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez.html',
                }
              ]
            },
            {
              name: 'securite',
              url: '/securite',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'BesoinsSecuriteCtrl'              
            }
          ]
        },
        {
          name: 'vos_attentes',
          url: '/vos_attentes',
          template: '<div id="form-views" ui-view></div>',
          abstract: true,
          children: [
            {
              name: 'type_aide',
              url: '/type_aide',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'TypeAideCtrl',
              children: [
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez.html',
                }
              ]
            },
            {
              name: 'structure',
              url: '/structure',
              templateUrl: 'views/partials/attente_structure.html',
              controller: 'AttenteStructureCtrl'
            }
          ]
        },
        {
          name: 'autres_renseignements',
          url: '/autres_renseignements',
          templateUrl: 'views/partials/question_textarea.html',
          controller: 'AutresRenseignementsCtrl'
        },
        {
          name: 'envoi',
          url: '/envoi',
          templateUrl: 'views/envoi.html',
          controller: 'EnvoiCtrl'
        }
      ]
    });

    // catch all route
    // send users to the home page
    $urlRouterProvider.otherwise('/questionnaire/conditions');

});
