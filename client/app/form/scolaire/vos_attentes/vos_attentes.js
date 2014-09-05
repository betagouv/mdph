'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/votre_scolarite/vos_attentes', '/form/votre_scolarite/vos_attentes/structure');
    $stateProvider.state('form.votre_scolarite.vos_attentes', {
      url: '/vos_attentes',
      template: '<ui-view/>',
      controller: 'VosAttentesScolairesCtrl'
    }).state('form.votre_scolarite.vos_attentes.structure', {
      url: '/structure',
      templateUrl: 'components/question/structure.html',
      controller: 'AttenteStructureCtrl'
    }).state('form.votre_scolarite.vos_attentes.autres_renseignements', {
      url: '/autres_renseignements',
      templateUrl: 'components/question/autres_renseignements.html',
      controller: 'AutresRenseignementsScolaireCtrl'
    });
  });
