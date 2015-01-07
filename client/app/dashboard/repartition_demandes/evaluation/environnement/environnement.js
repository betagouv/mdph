'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.repartition_demandes.detail.evaluation.environnement', {
        url: '/environnement',
        templateUrl: 'app/dashboard/repartition_demandes/evaluation/environnement/environnement.html',
        controller: 'EnvironnementCtrl'
      });
  });
