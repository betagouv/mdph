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
        var limitDate = new Date();
        var currentYear = limitDate.getFullYear();
        limitDate.setFullYear(currentYear - 18);
        return new Date(date).getTime() <= limitDate.getTime();
    };
});
