'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('a_propos', {
        url: '/a_propos',
        templateUrl: 'app/apropos/apropos.html'
      });
  });
