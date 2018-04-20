'use strict';

angular.module('impactApp')
  .factory('AdressService', function($http, appConfig) {
    return {
      getAdress(val, mdph) {
        const mainLocation = _.find(mdph.locations, {headquarters: true}) || mdph.locations[0];

        return $http({
          method: 'GET',
          url: appConfig.banUrl,
          params: {
            q: val,
            lat: mainLocation.coordinates.coordy,
            lon: mainLocation.coordinates.coordx,
            limit: 8
          }
        })
        .then(function(response) {
          return response.data.features;
        });
      },

      fillAdressOnSelect(result, identite) {
        identite.nomVoie = result.properties.name;
        identite.code_postal = result.properties.postcode;
        identite.localite = result.properties.city;
      }
    };
  });
