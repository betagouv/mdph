'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('departement', {
        parent: 'layout',
        url: '',
        resolve: {
          currentUser: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        },
        templateUrl: 'app/departement/departement.html',
        controller: 'DepartementCtrl',
        controllerAs: 'departementctrl',
      });
  });
