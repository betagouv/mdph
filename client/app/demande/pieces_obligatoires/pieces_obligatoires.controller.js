'use strict';

angular.module('impactApp')
  .controller('PiecesObligatoiresCtrl', function ($scope, FormService) {
    $scope.complete = false;
    $scope.currentStep = $scope.steps[1];

    $scope.$on('documentStepComplete', function () {
      FormService.saveStep($scope.form, $scope.steps[2].id, function(nextStep) {
        $scope.form.step = nextStep;
        $scope.$parent.$broadcast('refreshFormStepSection');
      });
    });
  });
