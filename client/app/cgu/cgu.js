'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('cgu', {
        url: '/cgu',
        parent: 'layout',
        authenticate: true,
        data: {
          title: 'CGU'
        },
        templateUrl: 'app/cgu/cgu.html',
        controller: 'MonCompteCtrl',
      });
  });

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('cgu', {
        url: '/cgu',
        templateUrl: 'app/cgu/cgu.html'
      });
  });
