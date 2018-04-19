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
          },
          headers: {
            'Cache-Control': undefined
          },
        })
        .then(function(response) {
          console.info('response.data.features   ' + response.data.features);
          return response.data.features;

        })
        .catch((err) => {
          console.info('erqSDQWD   ' + err);
        });
      },

      fillAdressOnSelect(result, identite) {
        identite.nomVoie = result.properties.name;
        identite.code_postal = result.properties.postcode;
        identite.localite = result.properties.city;
      }
    };
  });
