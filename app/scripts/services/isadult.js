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
        if (date === undefined) {
          return true;
        }
        var today = new Date();
        var currentYear = today.getYear();
        var limit = today.setYear(currentYear - 18);
        return date.getTime() <= limit;
    };
});
