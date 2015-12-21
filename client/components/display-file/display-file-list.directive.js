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
          return Object.keys($scope.categories).length === 0;
        };
      }
    };
  });
