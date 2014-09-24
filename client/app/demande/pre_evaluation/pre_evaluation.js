'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('demande.pre_evaluation', {
        url: '/pre_evaluation',
        templateUrl: '/app/demande/pre_evaluation/pre_evaluation.html'
      });
  });
