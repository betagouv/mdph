'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement', {
        url: '/mdph/:codeDepartement',
        templateUrl: 'app/main/main.html',
        controller: 'DepartementCtrl',
        resolve: {
          mdph: function(Mdph, $stateParams) {
            return Mdph.get({codeDepartement: $stateParams.codeDepartement});
          }
        }
      });
  });
