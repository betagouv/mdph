'use strict';

angular.module('impactApp')
  .directive('displayFileList', function() {
    return {
      scope: {
        categories: '=',
        request: '=',
        showValidationActions: '=',
        user: '='
      },
      templateUrl: 'components/display-file/display-file-list.html',
      controller: function($scope) {
        $scope.empty = function() {
          if (!$scope.categories) {
            return;
          }

          return Object.keys($scope.categories).length === 0;
        };
      }
    };
  });
