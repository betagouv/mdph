'use strict';

angular.module('impactApp')
  .factory('isAdult', function() {
    return function(contexte) {
      if (angular.isUndefined(contexte) ||
          angular.isUndefined(contexte.dateNaissance)) {
        return true;
      }
      var formDate = contexte.dateNaissance;

      var currentYear = new Date().getFullYear();

      var limitDate = new Date();
      limitDate.setFullYear(currentYear - 20);

      return new Date(formDate).getTime() <= limitDate.getTime();
    };
});
