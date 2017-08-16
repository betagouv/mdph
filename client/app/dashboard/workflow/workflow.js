'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workflow', {
        url: '/workflow',
        template: '<div ui-view></div>',
        redirectTo: {
          url: 'dashboard.workflow.list',
          params: {
            status: 'emise',
            userId: 'me'
          }
        },
        authenticate: true
      });
  });
