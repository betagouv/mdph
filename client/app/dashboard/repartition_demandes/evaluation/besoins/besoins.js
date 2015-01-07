'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.repartition_demandes.detail.evaluation.besoins', {
        url: '/besoins',
        templateUrl: 'app/dashboard/repartition_demandes/evaluation/besoins/besoins.html',
        controller: 'BesoinsCtrl'
      });
  });
