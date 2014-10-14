'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests.detail.evaluation', {
        url: '/evaluation',
        templateUrl: 'app/dashboard/requests/detail/evaluation/evaluation.html'
      });
  });
