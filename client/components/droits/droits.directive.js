'use strict';

angular.module('impactApp')
  .directive('prestations', function () {
    return {
      scope: {
        prestations: '=',
        width: '='
      },
      templateUrl: 'components/droits/droits.html',
      restrict: 'EA'
    };
  });
