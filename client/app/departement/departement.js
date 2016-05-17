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
          currentMdph: function(MdphResource, $stateParams) {
            if ($stateParams.codeDepartement) {
              return MdphResource.get({zipcode: $stateParams.codeDepartement}).$promise;
            } else {
              return null;
            }
          }
        }
      });
  });
