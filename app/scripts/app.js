'use strict';

/**
 * @ngdoc overview
 * @name impactApp
 * @description
 * # impactApp
 *
 * Main module of the application.
 */
var app = angular
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
      name: 'form',
      url: '/questionnaire',
      controller: 'FormCtrl',
      templateUrl: 'views/form.html',
      children: [
        {
          name: 'contexte',
          url: '/contexte',
          template: '<ui-view/>',
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
            }
          ]
        },
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
              controller: 'VieFamilleCtrl'
            },
            {
              name: 'logement',
              url: '/logement',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'LogementCtrl'
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
            },
            {
              name: 'objet',
              url: '/objet',
              templateUrl: 'views/partials/question_checkbox.html',
              controller: 'ObjetCtrl'
            },
            {
              name: 'aidant',
              url: '/aidant',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'ConditionAidantCtrl'
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
              controller: 'RaisonNonScolaireCtrl'
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
                }
              ]
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
                  controller: 'AdapteHandicapCtrl'
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
                  controller: 'AmenagementCtrl'
                },
                {
                  name: 'arret_de_travail',
                  url: '/arret_de_travail',
                  templateUrl: 'views/partials/question_radio.html',
                  controller: 'ArretDeTravailCtrl'
                },
                {
                  name: 'indemnite_journaliere',
                  url: '/indemnite_journaliere',
                  templateUrl: 'views/partials/question_radio.html',
                  controller: 'IndemniteJournaliereCtrl'
                },
                {
                  name: 'accident_de_travail',
                  url: '/accident_de_travail',
                  templateUrl: 'views/partials/question_radio.html',
                  controller: 'AccidentDeTravailCtrl'
                },
                {
                  name: 'professionnel_social',
                  url: '/professionnel_social',
                  templateUrl: 'views/partials/question_radio.html',
                  controller: 'ProfessionnelSocialCtrl'
                },
                {
                  name: 'medecin_travail',
                  url: '/medecin_travail',
                  templateUrl: 'views/partials/question_radio.html',
                  controller: 'MedecinTravailCtrl'
                }
              ]
            },
            {
              name: 'projet_professionnel',
              url: '/projet_professionnel',
              template: '<ui-view/>',
              abstract: true,
              controller: 'ProjetProfessionnelCtrl',
              children: [
                {
                  name: 'description',
                  url: '/description',
                  templateUrl: 'views/partials/question_radio.html',
                  controller: 'DescriptionProjetProCtrl'
                },
                {
                  name: 'besoin_soutien',
                  url: '/besoin_soutien',
                  templateUrl: 'views/partials/question_checkbox.html',
                  controller: 'BesoinSoutienCtrl'
                },
                {
                  name: 'structure',
                  url: '/structure',
                  templateUrl: 'views/partials/attente_structure.html',
                  controller: 'AttenteStructureProjetProCtrl'
                },
                {
                  name: 'autres_renseignements',
                  url: '/autres_renseignements',
                  templateUrl: 'views/partials/autres_renseignements.html',
                  controller: 'AutresRenseignementsProjetProCtrl'
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
                  controller: 'EmploiPasseCtrl'
                },
                {
                  name: 'pole_emploi',
                  url: '/pole_emploi',
                  templateUrl: 'views/partials/question_radio.html',
                  controller: 'PoleEmploiCtrl'
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
              controller: 'VieAidantCtrl'
            },
            {
              name: 'emploi',
              url: '/emploi',
              templateUrl: 'views/partials/question_radio.html',
              controller: 'EmploiAidantCtrl'
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
              controller: 'DedommagementCtrl'
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
              controller: 'EmpechementCtrl'
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

app.run(function ($rootScope) {
    $rootScope.debug = false;
    $rootScope.debugAdultText = 'Affiché uniquement si le demandeur est adulte';
});
