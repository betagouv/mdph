'use strict';

/**
 * @ngdoc service
 * @name impactApp.isAdult
 * @description
 * # isAdult
 * Service in the impactApp.
 */
angular.module('impactApp')
  .factory('isAdult', function() {
    return function(date) {
        if (angular.isUndefined(date)) {
          return true;
        }
        var today = new Date();
        var currentYear = today.getFullYear();
        var limit = today.setFullYear(currentYear - 18);
        return date <= limit;
    };
});
