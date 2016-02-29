'use strict';

angular.module('impactApp')
  .factory('estAdulte', function() {
    return function(dateNaissance) {
      if (dateNaissance) {
        return moment().diff(dateNaissance, 'years') >= 20;
      }

      return true;
    };
  })
  .factory('estMineur', function() {
    return function(dateNaissance) {
      if (dateNaissance) {
        return moment().diff(dateNaissance, 'years') < 20;
      }

      return false;
    };
  });
