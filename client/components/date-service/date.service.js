'use strict';

angular.module('impactApp')
  .factory('estEnfant', function() {
    return function(dateNaissance) {
      if (dateNaissance) {
        return moment().add(-16, 'years').diff(dateNaissance, 'days') < 0;
      }

      return false;
    };
  })
  .factory('estAdulte', function() {
    return function(dateNaissance) {
      if (dateNaissance) {
        return moment().add(-20, 'years').diff(dateNaissance, 'days') >= 0;
      }

      return true;
    };
  })
  .factory('estMineur', function() {
    return function(dateNaissance) {
      if (dateNaissance) {
        return moment().add(-20, 'years').diff(dateNaissance, 'days') < 0;
      }

      return false;
    };
  });
