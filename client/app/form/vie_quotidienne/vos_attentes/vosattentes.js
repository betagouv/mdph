'use strict';

angular.module('impactApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/form/vie_quotidienne/vos_attentes', '/form/vie_quotidienne/vos_attentes/type_aide');
    $stateProvider.state('form.vie_quotidienne.vos_attentes', {
      url: '/vos_attentes',
      template: '<ui-view/>',
      controller: 'VosAttentesVieCtrl'
    }).state('form.vie_quotidienne.vos_attentes.type_aide', {
      url: '/type_aide',
      templateUrl: 'components/question/checkbox.html',
      controller: 'TypeAideCtrl'
    }).state('form.vie_quotidienne.vos_attentes.structure', {
      url: '/structure',
      templateUrl: 'components/question/structure.html',
      controller: 'AttenteStructureCtrl'
    }).state('form.vie_quotidienne.vos_attentes.autres_renseignements', {
      url: '/autres_renseignements',
      templateUrl: 'components/question/autres_renseignements.html',
      controller: 'AutresRenseignementsCtrl'
    }).state('form.vie_quotidienne.vos_attentes.objet', {
      url: '/objet',
      templateUrl: 'components/question/checkbox.html',
      controller: 'ObjetCtrl'
    });
  });
