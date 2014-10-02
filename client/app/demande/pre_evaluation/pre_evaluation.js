'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('demande.preevaluation', {
        url: '/pre_evaluation',
        templateUrl: 'app/demande/pre_evaluation/pre_evaluation.html',
        authenticate: true
      });
  });
