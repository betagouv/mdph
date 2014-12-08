'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('departement', {
        url: '/:codeDepartement',
        template: '<ui-view></ui-view>',
        controller: 'DepartementCtrl',
        abstract: true,
        resolve: {
          mdph: function(Mdph, $stateParams) {
            return Mdph.get({codeDepartement: $stateParams.codeDepartement});
          }
        }
      });
  });
