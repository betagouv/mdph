'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.vie_au_travail';

    $stateProvider
      // Situation professionnelle
      .state(index + '.situation_professionnelle', {
        url: '/situation_professionnelle',
        template: '<ui-view/>',
        abstract: true
      })
      .state(index + '.situation_professionnelle.condition', {
        url: '/condition',
        templateUrl: 'components/question/radio.html',
        controller: 'ConditionTravailCtrl'
      })
      .state(index + '.situation_professionnelle.milieu', {
        url: '/milieu',
        templateUrl: 'components/question/radio.html',
        controller: 'MilieuCtrl'
      })
      .state(index + '.situation_professionnelle.type', {
        url: '/type',
        templateUrl: 'components/question/radio.html',
        controller: 'TypeEmploiCtrl'
      })
      .state(index + '.situation_professionnelle.employeur', {
        url: '/employeur',
        templateUrl: 'components/question/employeur.html',
        controller: 'EmployeurCtrl'
      })

      // Projet professionnel
      .state(index + '.projet_professionnel', {
        url: '/projet_professionnel',
        template: '<ui-view/>',
        abstract: true
      })
      .state(index + '.projet_professionnel.description', {
        url: '/description',
        templateUrl: 'components/question/radio.html',
        controller: 'DescriptionProjetProCtrl'
      })
      .state(index + '.projet_professionnel.besoin_soutien', {
        url: '/besoin_soutien',
        templateUrl: 'components/question/checkbox.html',
        controller: 'BesoinSoutienCtrl'
      })
      .state(index + '.projet_professionnel.structure', {
        url: '/structure',
        templateUrl: 'components/question/structure.html',
        controller: 'AttenteStructureProjetProCtrl'
      })
      .state(index + '.projet_professionnel.autres_renseignements', {
        url: '/autres_renseignements',
        templateUrl: 'components/question/autres_renseignements.html',
        controller: 'AutresRenseignementsProjetProCtrl'
      });
  });
