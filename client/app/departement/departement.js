'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement', {
        url: '/mdph/:codeDepartement',
        templateUrl: 'app/departement/departement.html',
        controller: 'DepartementCtrl',
        resolve: {
          mdph: function(Mdph, $stateParams) {
            return Mdph.get({zipcode: $stateParams.codeDepartement}).$promise;
          }
        }
      });
  });
