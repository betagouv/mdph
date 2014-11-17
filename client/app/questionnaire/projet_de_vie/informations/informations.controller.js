'use strict';

angular.module('impactApp')
  .controller('InformationsCtrl', function ($scope) {
    if (angular.isUndefined($scope.formAnswers.contexte)) {
      $scope.formAnswers.contexte = {};
    }

    $scope.sectionModel = $scope.formAnswers.contexte;
  });
