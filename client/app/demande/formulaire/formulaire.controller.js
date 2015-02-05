'use strict';

angular.module('impactApp')
  .controller('FormulaireCtrl', function ($scope, DroitService) {
    $scope.currentStep = $scope.steps[0];

    if ($scope.currentRequest) {
      DroitService.compute($scope.currentRequest.formAnswers).success(function(result) {
        $scope.prestations = result;
      });
    }
  });
