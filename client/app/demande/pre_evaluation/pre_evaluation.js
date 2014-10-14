'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('liste_demandes.demande.preevaluation', {
        url: '/preevaluation',
        templateUrl: 'app/demande/pre_evaluation/pre_evaluation.html',
        authenticate: true
      });
  });
