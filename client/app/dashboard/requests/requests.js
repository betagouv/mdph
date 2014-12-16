'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests', {
        url: '/demandes',
        templateUrl: 'app/dashboard/requests/requests.html',
        controller: 'RequestsCtrl',
        resolve: {
          requests: function(RequestResource) {
            return RequestResource.query({opened: true, evaluator: false}).$promise;
          }
        },
        authenticate: true
      });
  });
