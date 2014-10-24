'use strict';

angular.module('impactApp')
  .directive('qtitle', function ($modal) {
    return {
      templateUrl: 'components/qtitle/qtitle.html',
      restrict: 'EA',
      controller: function($scope, $http, Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.showHelp = function() {
          $modal.open({
            templateUrl: $scope.helpTemplate,
            controller: function ($scope, $modalInstance) {
              $scope.ok = function () {
                $modalInstance.close();
              };
            }
          });
        };
      }
    };
  });
