'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    var index = 'departement.questionnaire.projet_de_vie.aidant.vos_attentes';
    $stateProvider.state(index, {
      url: '/vos_attentes',
      template: '<ui-view/>',
      controller: 'VosAttentesAidantCtrl',
      abstract: true
    })
    .state(index + '.type_attente', {
      url: '/type_attente',
      templateUrl: 'components/question/checkbox.html',
      controller: 'TypeAttenteAidantCtrl'
    })
    .state(index + '.structure', {
      url: '/structure',
      templateUrl: 'components/question/structure.html',
      controller: 'AttenteStructureAidantCtrl'
    })
    .state(index + '.autres_renseignements', {
      url: '/autres_renseignements',
      templateUrl: 'components/question/autres_renseignements.html',
      controller: 'AutresRenseignementsAidantCtrl'
    });
  });
