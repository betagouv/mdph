'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workflow.detail.history', {
        url: '/vie_de_la_demande',
        templateUrl: 'app/dashboard/workflow/detail/history/history.html',
        controller: 'RequestHistoryCtrl',
        authenticate: true
      });
  });
