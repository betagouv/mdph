'use strict';

angular.module('impactApp')
  .controller('VotreSituationCtrl', function ($scope) {

    if (angular.isUndefined($scope.sectionModel.situation)) {
      $scope.sectionModel.situation = {
        label: 'Situation professionnelle',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.sectionModel.situation.answers;
  });
