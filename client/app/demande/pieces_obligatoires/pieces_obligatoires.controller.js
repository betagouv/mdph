'use strict';

angular.module('impactApp')
  .controller('PiecesObligatoiresCtrl', function ($scope, FormService) {
    $scope.currentStep = $scope.steps[1];

    $scope.$on('documentStepComplete', function () {
      $scope.complete = true;
    });

    $scope.validateStep = function() {
      FormService.saveStepState($scope.form, $scope.currentStep, 'a_valider', function() {
        $scope.$parent.$broadcast('refreshFormStepSection');
      });
    };

    $scope.currentFormStep = _.find($scope.form.steps, {'name': $scope.currentStep.id});
  });
