'use strict';

/**
 * @ngdoc service
 * @name impactApp.isAdult
 * @description
 * # isAdult
 * Service in the impactApp.
 */
angular.module('impactApp')
  .factory('estRepresentant', function() {
    return function(contexte) {
        if (angular.isUndefined(contexte) ||
            angular.isUndefined(contexte.answers) ||
            angular.isUndefined(contexte.answers.estRepresentant)) {
          return false;
        }
        return contexte.answers.estRepresentant.value;
    };
});
