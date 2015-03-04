'use strict';

angular.module('impactApp')
  .directive('identityForm', function () {
    return {
      scope: {
        title: '=',
        section: '='
      },
      templateUrl: 'components/identity-form/identity-form.html',
      restrict: 'EA',
    };
  });
