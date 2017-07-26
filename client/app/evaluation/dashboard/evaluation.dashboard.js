'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('evaluation.dashboard', {
        url: '',
        parent: 'evaluation',
        authenticate: true,
        templateUrl: 'app/evaluation/dashboard/evaluation.dashboard.html',
        controller: 'EvaluationDashboardCtrl',
        controllerAs: 'evaluationDashboardCtrl',
      });
  });
