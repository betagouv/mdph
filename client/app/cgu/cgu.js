'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('cgu', {
        url: '/cgu',
        templateUrl: 'app/cgu/cgu.html'
      });
  });
