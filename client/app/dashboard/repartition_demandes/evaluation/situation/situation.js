'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.repartition_demandes.detail.evaluation.situation', {
        url: '/situation',
        templateUrl: 'app/dashboard/repartition_demandes/evaluation/situation/situation.html',
        controller: 'SituationCtrl'
      });
  });
