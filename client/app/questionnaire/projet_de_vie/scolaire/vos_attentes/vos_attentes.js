'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'questionnaire.projet_de_vie.scolarite';
    $stateProvider.state(index + '.vos_attentes', {
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
