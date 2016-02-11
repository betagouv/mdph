'use strict';

angular.module('impactApp')
  .filter('requestStatus', function(banettes) {
    var flatBannettes = _(banettes).pluck('statuses').flatten().indexBy('id').value();
    return function(input) {
      if (!input) {
        return 'Nouvelles';
      }

      var banette = flatBannettes[input];
      return banette ? banette.label : 'Label not found';
    };
  });
