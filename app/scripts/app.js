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
    'angularFileUpload',
    'ngStorage'
  ])
  .config(function (stateHelperProvider, $urlRouterProvider, $stateProvider) {
    $stateProvider.state({
      name: 'conditions',
      url: '/conditions',
      templateUrl: 'views/conditions.html'
    });
    stateHelperProvider.setNestedState({
      name: 'contexte',
      url: '/contexte',
      templateUrl: 'views/contexte.html',
      abstract: true,
      controller: 'ContexteCtrl',
      children: [
        {
          name: 'code_postal',
          url: '/code_postal',
          templateUrl: 'views/partials/code_postal.html',
          controller: 'CodePostalCtrl'
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
          name: 'objet',
          url: '/objet',
          templateUrl: 'views/partials/question_checkbox.html',
          controller: 'ObjetCtrl'
        }
      ]
    });
    stateHelperProvider.setNestedState({
      name: 'form',
      url: '/questionnaire',
      controller: 'FormCtrl',
      templateUrl: 'views/form.html',
      children: [
        {
          name: 'vie_quotidienne',
          url: '/vie_quotidienne',
          template: '<ui-view/>',
          abstract: true,
          controller: 'VieQuotidienneCtrl',
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
            },
            {
              name: 'vos_besoins',
              url: '/vos_besoins',
              template: '<ui-view/>',
              abstract: true,
              controller: 'BesoinsCtrl',
              children: [
                {
                  name: 'quotidien',
                  url: '/quotidien',
                  templateUrl: 'views/partials/question_checkbox.html',
                  controller: 'QuotidienCtrl'
                },
                {
                  name: 'deplacement',
                  url: '/deplacement',
                  templateUrl: 'views/partials/question_checkbox.html',
                  controller: 'DeplacementCtrl'
                },
                {
                  name: 'social',
                  url: '/social',
                  templateUrl: 'views/partials/question_checkbox.html',
                  controller: 'SocialCtrl'
                },
                {
                  name: 'lieu_de_vie',
                  url: '/lieu_de_vie',
                  templateUrl: 'views/partials/question_checkbox.html',
                  controller: 'LieuDeVieCtrl'
                },
                {
                  name: 'securite',
                  url: '/securite',
                  templateUrl: 'views/partials/question_checkbox.html',
                  controller: 'SecuriteCtrl'              
                }
              ]
            },
            {
              name: 'vos_attentes',
              url: '/vos_attentes',
              template: '<ui-view/>',
              abstract: true,
              controller: 'VosAttentesCtrl',
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
                },
                {
                  name: 'autres_renseignements',
                  url: '/autres_renseignements',
                  templateUrl: 'views/partials/question_textarea.html',
                  controller: 'AutresRenseignementsCtrl'
                }
              ]
            }
          ]
        },
        {
          name: 'votre_scolarite',
          url: '/votre_scolarite',
          template: '<ui-view/>',
          abstract: true,
          controller: 'ScolaireCtrl',
          children: [
            {
              name: 'condition',
              url: '/condition',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'ConditionScolaireCtrl'
            },
            {
              name: 'type_scolaire',
              url: '/type_scolaire',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'TypeScolaireCtrl'
            },
            {
              name: 'etablissement',
              url: '/etablissement',
              templateUrl: 'views/partials/etablissement_scolaire.html',
              controller: 'EtablissementScolaireCtrl'
            },
            {
              name: 'raison_non_scolaire',
              url: '/raison_non_scolaire',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'RaisonNonScolaireCtrl',
              children: [
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez.html',
                }
              ]
            },
            {
              name: 'vos_attentes',
              url: '/vos_attentes',
              template: '<ui-view/>',
              abstract: true,
              controller: 'VosAttentesScolairesCtrl',
              children: [
                {
                  name: 'structure',
                  url: '/structure',
                  templateUrl: 'views/partials/attente_structure.html',
                  controller: 'AttenteStructureCtrl'
                },
                {
                  name: 'autres_renseignements',
                  url: '/autres_renseignements',
                  templateUrl: 'views/partials/question_textarea.html',
                  controller: 'AutresRenseignementsScolaireCtrl'
                }
              ]
            }
          ]
        },
        {
          name: 'votre_travail',
          url: '/votre_travail',
          template: '<ui-view/>',
          abstract: true,
          controller: 'TravailCtrl',
          children: [
            {
              name: 'condition',
              url: '/condition',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'ConditionTravailCtrl'
            }
          ]
        },
        {
          name: 'votre_aidant',
          url: '/votre_aidant',
          //template: '<ui-view/>',
          //abstract: true,
          templateUrl: 'views/partials/question_radio.html',
          controller: 'AidantCtrl'
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
    $urlRouterProvider.otherwise('/conditions');

});
