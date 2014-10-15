'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cm', {
        url: '/cm',
        templateUrl: 'app/cm/cm.html'
      });
  });
