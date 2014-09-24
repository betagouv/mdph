'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, FormService, SectionService, currentForm, Auth) {
    $scope.form = currentForm;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.updatedAt = FormService.updatedAt;
    $scope.steps = SectionService.getFormSteps(currentForm);
  });
