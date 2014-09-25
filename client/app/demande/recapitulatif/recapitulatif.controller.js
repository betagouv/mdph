'use strict';

angular.module('impactApp')
  .controller('RecapitulatifCtrl', function ($scope, DroitService) {
    $scope.currentStep = $scope.steps[0];

    if ($scope.form) {
      $scope.prestations = DroitService.computePrestations($scope.form.formAnswers);
    }
  });
