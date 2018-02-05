'use strict';

angular.module('impactApp')
  .factory('estAdulteStricte', function() {
    return function(dateNaissance) {
      if (dateNaissance) {
        return moment().add(-20, 'years').diff(dateNaissance, 'days') > 0;
      }

      return true;
    };
  })
  .factory('estEnfant', function() {
    return function(dateNaissance) {
      if (dateNaissance) {
        return moment().diff(dateNaissance, 'years') < 16;
      }

      return false;
    };
  })
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
