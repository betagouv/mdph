'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('departement', {
        parent: 'layout',
        url: '',
        templateUrl: 'app/departement/departement.html',
        authenticate: true,
        authorized: ['user'],
        controller: 'DepartementCtrl',
        controllerAs: 'departementctrl',
      });
  });
