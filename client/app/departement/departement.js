'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('departement', {
        parent: 'layout',
        url: '/mdph/:codeDepartement',
        templateUrl: 'app/departement/departement.html',
        controller: 'DepartementCtrl',
        resolve: {
          mdph: function(MdphResource, $stateParams) {
            return MdphResource.get({zipcode: $stateParams.codeDepartement}).$promise;
          }
        }
      });
  });
