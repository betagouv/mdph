'use strict';

angular.module('impactApp').directive('inputDate', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.push(function(viewValue) {
        if (!viewValue || viewValue === '') {
          ctrl.$setValidity('inputDate', true);
          return '';
        }

        var result = moment(viewValue, 'DD/MM/YYYY', true);

        var isValid = result.isValid();
        ctrl.$setValidity('inputDate', isValid);
        if (!isValid) {
          return undefined;
        }

        return result.toDate();
      });

      ctrl.$formatters.push(function(date) {
        if (!date) {
          return '';
        }

        return  moment(date).format('DD/MM/YYYY');
      });
    }
  };
});
