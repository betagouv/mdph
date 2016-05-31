'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('departement', {
        parent: 'layout',
        url: '',
        templateUrl: 'app/departement/departement.html',
        controller: 'DepartementCtrl'
      });
  });
