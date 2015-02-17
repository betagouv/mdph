'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {

    var index = 'departement.questionnaire.vie_scolaire';
    $stateProvider
      .state('departement.questionnaire.vie_scolaire', {
        url: '/vie_scolaire',
        templateUrl: 'app/questionnaire/vie_scolaire/scolaire.html',
        controller: 'ScolaireCtrl',
      })

      .state(index + '.situation', {
        url: '/situation',
        template: '<ui-view/>',
        abstract: true
      }).state(index + '.situation.condition', {
        url: '/condition',
        templateUrl: 'components/question/radio.html',
        controller: 'ConditionScolaireCtrl'
      }).state(index + '.situation.type_scolaire', {
        url: '/type_scolaire',
        templateUrl: 'components/question/radio.html',
        controller: 'TypeScolaireCtrl'
      }).state(index + '.situation.etablissement', {
        url: '/etablissement',
        templateUrl: 'components/question/etablissement_scolaire.html',
        controller: 'EtablissementScolaireCtrl'
      }).state(index + '.situation.raison_non_scolaire', {
        url: '/raison_non_scolaire',
        templateUrl: 'components/question/radio.html',
        controller: 'RaisonNonScolaireCtrl'
      })

      .state(index + '.vos_attentes', {
        url: '/vos_attentes',
        template: '<ui-view/>',
      }).state(index + '.vos_attentes.structure', {
        url: '/structure',
        templateUrl: 'components/question/structure.html',
        controller: 'AttenteStructureCtrl'
      }).state(index + '.vos_attentes.autres_renseignements', {
        url: '/autres_renseignements',
        templateUrl: 'components/question/autres_renseignements.html',
        controller: 'AutresRenseignementsScolaireCtrl'
      });
  });
