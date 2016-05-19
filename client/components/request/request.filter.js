'use strict';

angular.module('impactApp')
  .filter('requestStatus', function(BanettesConstant) {

    var flatBannettes = _(BanettesConstant).pluck('statuses').flatten().indexBy('id').value();
    return function(input) {
      if (!input) {
        return 'Nouvelles';
      }

      var banette = flatBannettes[input];
      return banette ? banette.label : 'Label not found';
    };
  });
