'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('departement', {
        parent: 'main',
        url: '/mdph/:codeDepartement',
        resolve: {
          mdph: function(MdphResource, $stateParams) {
            return MdphResource.get({zipcode: $stateParams.codeDepartement}).$promise;
          }
        },
        views: {
          '': {
            templateUrl: 'app/departement/departement.html',
            controller: 'DepartementCtrl'
          },
          'navbar@departement': {
            templateUrl: 'app/navbar/navbar.html',
            controller: 'NavbarCtrl'
          }
        }
      });
  });
