'use strict';

angular.module('impactApp')
  .factory('isAdult', function($window) {
    return function(contexte) {
      $window.alert('deprecated');
      if (angular.isUndefined(contexte) ||
          angular.isUndefined(contexte.dateNaissance)) {
        return true;
      }

      return moment().diff(contexte.dateNaissance, 'years') >= 20;
    };
  })
  .factory('estMineur', function() {
    return function(birthDate) {
      return moment().diff(birthDate, 'years') < 18;
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
