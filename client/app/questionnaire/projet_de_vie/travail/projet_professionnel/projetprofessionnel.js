'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.projet_de_vie.travail';
    $stateProvider.state(index + '.projet_professionnel', {
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
