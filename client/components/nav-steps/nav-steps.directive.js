'use strict';

angular.module('impactApp')
  .directive('navSteps', function () {
    return {
      templateUrl: 'components/nav-steps/nav-steps.html',
      restrict: 'EA',
      controller: function($scope, QuestionService) {
        $scope.isNextStepDisabled = function() {
          return QuestionService.isNextStepDisabled($scope.question, $scope.sectionModel, $scope.checkNextStep);
        };
      },
      link: function () {
      }
    };
  });
