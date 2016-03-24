'use strict';

angular.module('impactApp')
  .directive('trajectoire', function() {
    return {
      templateUrl: 'components/trajectoire/trajectoire.html',
      restrict: 'EA',
      scope: {
        sublevel: '=',
        questions: '=',
        request: '='
      },
      controller: 'TrajectoireController'
    };
  });
