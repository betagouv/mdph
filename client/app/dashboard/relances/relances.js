'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.relances', {
        url: '/relances',
        templateUrl: 'app/dashboard/relances/relances.html',
        controller: 'RelancesCtrl',
        resolve: {
          requests: function(RequestResource) {
            return RequestResource.query({opened: true}).$promise;
          }
        },
        authenticate: true
      });
  });
