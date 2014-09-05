'use strict';

angular.module('impactApp')
  .controller('SituationsCtrl', function ($scope) {

    if (angular.isUndefined($scope.sectionModel.situations)) {
      $scope.sectionModel.situations = {
        label: 'Situations particulières',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.sectionModel.situations.answers;
  });
