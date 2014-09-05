'use strict';

angular.module('impactApp')
  .directive('qtitle', function ($modal) {
    return {
      templateUrl: 'components/qtitle/qtitle.html',
      restrict: 'EA',
      controller: function($scope, $http, Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.saveForm = function() {
          $http.put('/api/forms/mine', $scope.formAnswers);
        };

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
