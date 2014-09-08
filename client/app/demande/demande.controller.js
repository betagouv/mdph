'use strict';

angular.module('impactApp')
  .controller('DemandeCtrl', function ($scope, currentForm) {
    if (angular.isDefined(currentForm)) {
      $scope.form = currentForm;
      $scope.updatedAt = moment($scope.form.updatedAt).fromNow();
    }
  });
