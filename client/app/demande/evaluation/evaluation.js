'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('demande.evaluation', {
        url: '/evaluation',
        templateUrl: '/app/demande/evaluation/evaluation.html'
      });
  });
