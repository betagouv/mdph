'use strict';

angular.module('impactApp')
  .component('passwordField', {
    templateUrl: 'components/password-field/password-field.html',
    controllerAs: 'passwordFieldCtrl',
    controller($scope, $state) {
      $scope.forms = $state.current.data.forms;
      $scope.inputType = 'password';
      $scope.toggleType = function() {
        if ($scope.inputType === 'password') {
          $scope.inputType = 'text';
        } else {
          $scope.inputType = 'password';
        }
      };

      const minNbrRules = 3;

      const rules = [
        new RegExp('[a-z]+'), /* regexLowerCase */
        new RegExp('[A-Z]+'), /* regexUpperCase */
        new RegExp('[0-9]+'), /* regexNumber */
      ];

      const InversedRules = [
        new RegExp('^[a-zA-Z0-9_]*$') /* regexAlphaNumeric */
      ];

      $scope.verifyPattern = function(form, field) {

        let password = form[field].$viewValue;
        let nbrSuitedRules = 0;
        let elt;
        for (elt = 0; elt < rules.length && nbrSuitedRules < minNbrRules; elt++) {
          if (rules[elt].test(password)) {
            nbrSuitedRules++;
          }
        }

        for (elt = 0; elt < InversedRules.length && nbrSuitedRules < minNbrRules; elt++) {
          if (!InversedRules[elt].test(password)) {
            nbrSuitedRules++;
          }
        }

        if (nbrSuitedRules < minNbrRules) {
          form[field].$setValidity('pattern', false);
        } else {
          form[field].$setValidity('pattern', true);
        }
      };
    }
  });
