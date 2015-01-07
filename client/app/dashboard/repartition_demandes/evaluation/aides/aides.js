'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.repartition_demandes.detail.evaluation.aides', {
        url: '/aides',
        templateUrl: 'app/dashboard/repartition_demandes/evaluation/aides/aides.html',
        controller: 'AidesCtrl'
      });
  });
