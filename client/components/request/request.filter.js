'use strict';

angular.module('impactApp')
  .filter('requestStatus', function(banettes) {
    var bannetteById = _.indexBy(banettes, 'id');

    return function(input) {
      if (!input) {
        return 'Nouvelles';
      }

      var banette = bannetteById[input];
      return banette ? banette.label : 'Label not found';
    };
  });
