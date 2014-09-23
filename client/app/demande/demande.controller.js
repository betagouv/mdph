'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, FormService, currentForm, Auth) {
    $scope.form = currentForm;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.updatedAt = FormService.updatedAt;
  });
