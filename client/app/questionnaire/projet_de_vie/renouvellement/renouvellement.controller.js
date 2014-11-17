'use strict';

angular.module('impactApp')
  .controller('RenouvellementsCtrl', function ($scope) {
    if (angular.isUndefined($scope.formAnswers.detailRenouvellement)) {
      $scope.formAnswers.detailRenouvellement = {};
    }

    $scope.sectionModel = $scope.formAnswers.detailRenouvellement;
  });
