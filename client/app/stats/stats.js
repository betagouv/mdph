'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('stats', {
        url: '/stats',
        templateUrl: 'app/stats/stats.html',
        controller: 'StatsCtrl'
      });
  });
