'use strict';

angular.module('impactApp')
  .factory('estAdulte', function() {
    return function(dateNaissance) {
      if (dateNaissance) {
        return moment().diff(dateNaissance, 'years') >= 18;
      }

      return true;
    };
  })
  .factory('estMineur', function() {
    return function(dateNaissance) {
      return moment().diff(dateNaissance, 'years') < 18;
    };
  })
  .factory('isLessThan62', function() {
    return function(contexte) {
      if (angular.isUndefined(contexte) ||
          angular.isUndefined(contexte.dateNaissance)) {
        return true;
      }

      return moment().diff(contexte.dateNaissance, 'years') < 62;
    };
  });
