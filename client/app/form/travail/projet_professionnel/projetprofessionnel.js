'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/votre_travail/projet_professionnel', '/form/votre_travail/projet_professionnel/description');
    $stateProvider.state('form.votre_travail.projet_professionnel', {
      url: '/projet_professionnel',
      template: '<ui-view/>'
    })
    .state('form.votre_travail.projet_professionnel.description', {
      url: '/description',
      templateUrl: 'components/question/radio.html',
      controller: 'DescriptionProjetProCtrl'
    })
    .state('form.votre_travail.projet_professionnel.besoin_soutien', {
      url: '/besoin_soutien',
      templateUrl: 'components/question/checkbox.html',
      controller: 'BesoinSoutienCtrl'
    })
    .state('form.votre_travail.projet_professionnel.structure', {
      url: '/structure',
      templateUrl: 'components/question/structure.html',
      controller: 'AttenteStructureProjetProCtrl'
    })
    .state('form.votre_travail.projet_professionnel.autres_renseignements', {
      url: '/autres_renseignements',
      templateUrl: 'components/question/autres_renseignements.html',
      controller: 'AutresRenseignementsProjetProCtrl'
    });
  });
