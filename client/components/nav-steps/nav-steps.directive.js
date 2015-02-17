'use strict';

angular.module('impactApp')
  .directive('navSteps', function () {
    return {
      transclude: true,
      templateUrl: 'components/nav-steps/nav-steps.html',
      restrict: 'EA',
      controller: function($scope, QuestionService, $window) {
        $scope.isNextStepDisabled = function() {
          return QuestionService.isNextStepDisabled($scope.question, $scope.sectionModel, $scope.checkNextStep);
        };

        $scope.previousStep = function() {
          $window.history.back();
        };
      },
      link: function () {
      }
    };
  });
