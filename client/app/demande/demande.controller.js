'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, FormService, currentForm) {
    if (angular.isDefined(currentForm)) {
      $scope.form = currentForm;
      $scope.updatedAt = FormService.updatedAt;
    }
  });
