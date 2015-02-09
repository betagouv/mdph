'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.simulation', {
        url: '/simulation',
        templateUrl: 'app/dashboard/simulation/simulation.html',
        controller: 'SimulationCtrl',
        authenticate: true
      });
  });
