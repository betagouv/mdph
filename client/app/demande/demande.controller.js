'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, FormService, FormStepService, currentForm, Auth) {
    $scope.form = currentForm;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.updatedAt = FormService.updatedAt;
    $scope.steps = FormStepService.getFormSteps(currentForm);

    $scope.$on('refreshFormStepSection', function () {
      $scope.steps = FormStepService.getFormSteps(currentForm);
    });
  });
