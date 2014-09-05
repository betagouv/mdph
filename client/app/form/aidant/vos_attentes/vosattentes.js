'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/votre_aidant/vos_attentes', '/form/votre_aidant/vos_attentes/type_attente');
    $stateProvider.state('form.votre_aidant.vos_attentes', {
      url: '/vos_attentes',
      template: '<ui-view/>',
      controller: 'VosAttentesAidantCtrl'
    })
    .state('form.votre_aidant.vos_attentes.type_attente', {
      url: '/type_attente',
      templateUrl: 'components/question/checkbox.html',
      controller: 'TypeAttenteAidantCtrl'
    })
    .state('form.votre_aidant.vos_attentes.structure', {
      url: '/structure',
      templateUrl: 'components/question/structure.html',
      controller: 'AttenteStructureAidantCtrl'
    })
    .state('form.votre_aidant.vos_attentes.autres_renseignements', {
      url: '/autres_renseignements',
      templateUrl: 'components/question/autres_renseignements.html',
      controller: 'AutresRenseignementsAidantCtrl'
    });
  });
