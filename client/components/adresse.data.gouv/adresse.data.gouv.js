'use strict';

angular.module('impactApp')
  .factory('AdressService', function($http, appConfig) {
    return {
      getAdress: function(val, lat, long) {
        return $http({
          method: 'GET',
          url: appConfig.banUrl,
          params: {
            q: val,
            lat: lat,
            lon: long,
            limit: 8
          }
        })
        .then(function(response) {
          return response.data.features;
        });
      }
    };
  });
