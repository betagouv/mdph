'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          mdphs: function(MdphResource) {
            return MdphResource.query({enabled: true}).$promise;
          },

          depsgeo: function($http) {
            return $http.get('/assets/departements.geojson').then(function(result) {
              return result.data;
            });
          }
        }
      });
  });
