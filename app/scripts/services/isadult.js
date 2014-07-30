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
    return function(contexte) {
      if (angular.isUndefined(contexte) ||
          angular.isUndefined(contexte.answers) ||
          angular.isUndefined(contexte.answers.dateNaissance) ||
          angular.isUndefined(contexte.answers.dateNaissance.value)) {
        return true;
      }
      var date = contexte.answers.dateNaissance.value;
      var limitDate = new Date();
      var currentYear = limitDate.getFullYear();
      limitDate.setFullYear(currentYear - 20);

      return new Date(date).getTime() <= limitDate.getTime();
    };
});
