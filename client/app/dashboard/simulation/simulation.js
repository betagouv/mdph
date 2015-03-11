'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.simulation', {
        url: '/simulation',
        templateUrl: 'app/dashboard/simulation/simulation.html',
        controller: 'SimulationCtrl',
        resolve: {
          sections: function($http) {
            return $http.get('api/questions').then(function(result) {
              return result.data;
            });
          }
        },
        authenticate: true
      });
  });
