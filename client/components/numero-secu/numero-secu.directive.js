'use strict';

angular.module('impactApp').directive('numeroSecu', function() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
      const isValid = (value) => {
        if (!value) {
          return true;
        }

        value = value.replace(/ /g, '');

        const valueKey = value.slice(-2);
        const valueRest = value.slice(0, -2);
        const computedKey = 97 - valueRest % 97;

        return parseInt(valueKey) === computedKey;
      };

      //For DOM -> model validation
      ngModel.$parsers.unshift((value) => {
        const valid = isValid(value);
        ngModel.$setValidity('numero-secu', valid);
        return value;
      });

      //For model -> DOM validation
      ngModel.$formatters.unshift((value) => {
        const valid = isValid(value);
        ngModel.$setValidity('numero-secu', valid);
        return value;
      });
    }
  };
});
