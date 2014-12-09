'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.partenaires', {
        url: '/partenaires',
        templateUrl: 'app/dashboard/partenaires/partenaires.html',
        controller: 'PartenairesCtrl',
        authenticate: true
      });
  });
