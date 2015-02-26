'use strict';

angular.module('impactApp')
  .directive('navSteps', function ($state) {
    return {
      transclude: true,
      templateUrl: 'components/nav-steps/nav-steps.html',
      restrict: 'EA',
      controller: function($scope, $window) {
        $scope.check = function(form) {
          if (form.$invalid) {
            form.showError = true;
          } else {
            $scope.saveLastSref($state.current.name);
            $scope.nextStep();
          }
        };

        $scope.previousStep = function() {
          $window.history.back();
        };
      },
      link: function () {
      }
    };
  });
