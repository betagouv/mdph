'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('liste_demandes.demande.evaluation', {
        url: '/evaluation',
        templateUrl: 'app/demande/evaluation/evaluation.html',
        authenticate: true
      });
  });
