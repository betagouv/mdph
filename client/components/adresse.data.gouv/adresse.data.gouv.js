'use strict';

angular.module('impactApp')
  .factory('AdressService', function($http) {
    return {
      getAdress: function(val, lat, long) {
        return $http({
          method: 'GET',
          url: 'https://api-adresse.data.gouv.fr/search/',
          params: {
            q: val,
            lat: lat,
            lon: long,
            limit: 8
          },
          ignoreInterceptor: true
        })
        .then(function(response) {
          return response.data.features;
        });
      }
    };
  });
