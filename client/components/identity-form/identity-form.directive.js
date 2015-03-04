'use strict';

angular.module('impactApp')
  .directive('identityForm', function () {
    return {
      templateUrl: 'components/identity-form/identity-form.html',
      restrict: 'EA',
    };
  });
