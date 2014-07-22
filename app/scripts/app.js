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
                  controller: 'TypeAideCtrl'
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
                  templateUrl: 'views/partials/autres_renseignements.html',
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
                  templateUrl: 'views/partials/autres_renseignements.html',
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
              name: 'situation_professionnelle',
              url: '/situation_professionnelle',
              template: '<ui-view/>',
              abstract: true,
              controller: 'VotreSituationCtrl',
              children: [
                {
                  name: 'condition',
                  url: '/condition',
                  templateUrl: 'views/partials/question_radio.html',
                  controller: 'ConditionTravailCtrl'
                },
                {
                  name: 'milieu',
                  url: '/milieu',
                  templateUrl: 'views/partials/question_radio.html',
                  controller: 'MilieuCtrl'
                },
                {
                  name: 'type',
                  url: '/type',
                  templateUrl: 'views/partials/question_radio.html',
                  controller: 'TypeEmploiCtrl'
                },
                {
                  name: 'employeur',
                  url: '/employeur',
                  templateUrl: 'views/partials/employeur.html',
                  controller: 'EmployeurCtrl'
                },
                {
                  name: 'emploi',
                  url: '/emploi',
                  template: '<ui-view/>',
                  abstract: true,
                  controller: 'EmploiCtrl',
                  children: [
                    {
                      name: 'nom_poste',
                      url: '/nom_poste',
                      templateUrl: 'views/partials/question_textinput.html',
                      controller: 'NomPosteCtrl'
                    },
                    {
                      name: 'temps',
                      url: '/temps',
                      templateUrl: 'views/partials/question_radio.html',
                      controller: 'EmploiTempsCtrl'
                    },
                    {
                      name: 'heures',
                      url: '/heures',
                      templateUrl: 'views/partials/question_textinput.html',
                      controller: 'EmploiHeuresCtrl'
                    },
                    {
                      name: 'adapte',
                      url: '/adapte',
                      templateUrl: 'views/partials/question_radio.html',
                      controller: 'AdapteHandicapCtrl',
                      children: [
                        {
                          name: 'autre',
                          templateUrl: 'views/partials/form_precisez.html',
                        }
                      ]
                    },
                    {
                      name: 'difficultes',
                      url: '/difficultes',
                      templateUrl: 'views/partials/question_textarea.html',
                      controller: 'EmploiDifficultesCtrl'
                    },
                    {
                      name: 'amenagement',
                      url: '/amenagement',
                      templateUrl: 'views/partials/question_radio.html',
                      controller: 'AmenagementCtrl',
                      children: [
                        {
                          name: 'autre',
                          templateUrl: 'views/partials/form_precisez.html',
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'sans_emploi',
                  url: '/sans_emploi',
                  template: '<ui-view/>',
                  abstract: true,
                  controller: 'SansEmploiCtrl',
                  children: [
                    {
                      name: 'passe',
                      url: '/passe',
                      templateUrl: 'views/partials/question_radio.html',
                      controller: 'EmploiPasseCtrl',
                      children: [
                        {
                          name: 'autre',
                          templateUrl: 'views/partials/form_precisez_big.html',
                        }
                      ]
                    },
                    {
                      name: 'pole_emploi',
                      url: '/pole_emploi',
                      templateUrl: 'views/partials/question_radio.html',
                      controller: 'PoleEmploiCtrl',
                      children: [
                        {
                          name: 'autre',
                          templateUrl: 'views/partials/form_precisez_date.html',
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'votre_aidant',
          url: '/votre_aidant',
          template: '<ui-view/>',
          abstract: true,
          controller: 'AidantCtrl',
          children: [
            {
              name: 'lien',
              url: '/lien',
              templateUrl: 'views/partials/question_textinput.html',
              controller: 'AidantLienCtrl'
            },
            {
              name: 'vie',
              url: '/vie',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'VieAidantCtrl',
              children: [
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez_date.html',
                }
              ]
            },
            {
              name: 'emploi',
              url: '/emploi',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'EmploiAidantCtrl',
              children: [
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez_yes_no.html',
                }
              ]
            },
            {
              name: 'nature_aide',
              url: '/nature_aide',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'NatureAideCtrl'
            },
            {
              name: 'nature_aide_bis',
              url: '/nature_aide_2',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'NatureAideBisCtrl'
            },
            {
              name: 'dedommagement',
              url: '/dedommagement',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'DedommagementCtrl',
              children: [
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez_montant.html',
                }
              ]
            },
            {
              name: 'accompagnement',
              url: '/accompagnement',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'AccompagnementCtrl'
            },
            {
              name: 'soutien',
              url: '/soutien',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'SoutienCtrl'
            },
            {
              name: 'empechement',
              url: '/empechement',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'EmpechementCtrl',
              children: [
                {
                  name: 'autre',
                  templateUrl: 'views/partials/form_precisez.html',
                }
              ]
            },
            {
              name: 'situation_future',
              url: '/situation_future',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'SituationFutureCtrl'
            },
            {
              name: 'renseignements',
              url: '/renseignements',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'RenseignementsAidantCtrl'
            },
            {
              name: 'vos_attentes',
              url: '/vos_attentes',
              template: '<ui-view/>',
              abstract: true,
              controller: 'VosAttentesAidantCtrl',
              children: [
                {
                  name: 'type_attente',
                  url: '/type_attente',
                  templateUrl: 'views/partials/question_checkbox.html',
                  controller: 'TypeAttenteAidantCtrl'
                },
                {
                  name: 'structure',
                  url: '/structure',
                  templateUrl: 'views/partials/attente_structure.html',
                  controller: 'AttenteStructureAidantCtrl'
                },
                {
                  name: 'autres_renseignements',
                  url: '/autres_renseignements',
                  templateUrl: 'views/partials/autres_renseignements.html',
                  controller: 'AutresRenseignementsAidantCtrl'
                }
              ]
            }
          ]
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
