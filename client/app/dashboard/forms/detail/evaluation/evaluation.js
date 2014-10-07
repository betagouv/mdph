'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms.detail.evaluation', {
        url: '/evaluation',
        templateUrl: 'app/dashboard/forms/detail/evaluation/evaluation.html'
      });
  });
