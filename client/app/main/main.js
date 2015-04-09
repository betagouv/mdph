'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/departement/departement.html',
        controller: 'MainCtrl'
      });
  });
