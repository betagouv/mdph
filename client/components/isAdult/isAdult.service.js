'use strict';

angular.module('impactApp')
  .factory('isAdult', function() {
    return function(contexte) {
      if (angular.isUndefined(contexte) ||
          angular.isUndefined(contexte.dateNaissance)) {
        return true;
      }
      return moment().diff(contexte.dateNaissance, 'years') >= 20;
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
