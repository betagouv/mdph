'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('cgu', {
        url: '/cgu',
        parent: 'layout',
        templateUrl: 'app/cgu/cgu.html'
      });
  });
