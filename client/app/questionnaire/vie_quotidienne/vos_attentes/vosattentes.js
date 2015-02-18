'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.vie_quotidienne';
    $stateProvider.state(index + '.vos_attentes', {
      url: '/vos_attentes',
      template: '<ui-view/>',
      abstract: true
    }).state(index + '.vos_attentes.type_aide', {
      url: '/type_aide',
      templateUrl: 'components/question/checkbox.html',
      controller: 'TypeAideCtrl'
    }).state(index + '.vos_attentes.structure', {
      url: '/structure',
      templateUrl: 'components/question/structure.html',
      controller: 'AttenteStructureCtrl'
    }).state(index + '.vos_attentes.carte', {
      url: '/carte',
      templateUrl: 'components/question/radio.html',
      controller: 'CarteCtrl'
    }).state(index + '.vos_attentes.autres_renseignements', {
      url: '/autres_renseignements',
      templateUrl: 'components/question/autres_renseignements.html',
      controller: 'AutresRenseignementsCtrl'
    });
  });
