'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workflow', {
        url: '/workflow',
        templateUrl: 'app/dashboard/workflow/workflow.html',
        redirectTo: {
          url: 'dashboard.workflow.list',
          params: {
            status: 'emise'
          }
        },
        authenticate: true
      });
  });
