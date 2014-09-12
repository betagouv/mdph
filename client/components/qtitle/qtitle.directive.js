'use strict';

angular.module('impactApp')
  .directive('qtitle', function ($modal) {
    return {
      templateUrl: 'components/qtitle/qtitle.html',
      restrict: 'EA',
      controller: function($scope, $http, Auth, QuestionService) {
        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.isNextStepDisabled = function() {
          return QuestionService.isNextStepDisabled($scope.question, $scope.sectionModel, $scope.checkNextStep);
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
