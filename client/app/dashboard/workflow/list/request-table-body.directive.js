'use strict';

angular.module('impactApp')
  .directive('requestTableBody', function() {
    return {
      templateUrl: 'app/dashboard/workflow/list/request-table-body.html',
      transclude: true,
      scope: {
        requestGroup: '=',
        title: '=',
        query: '='
      },
      compile: function(tElement, attrs, transclude) {
        return function($scope) {
          transclude($scope, function(clone) {
            tElement.append(clone);
          });
        };
      }
    };
  });
