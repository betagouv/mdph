'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VotreSituationCtrl
 * @description
 * # VotreSituationCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VotreSituationCtrl', function ($scope) {
    $scope.subtitle = 'Situation professionnelle';

    if (angular.isUndefined($scope.sectionModel.situation)) {
      $scope.sectionModel.situation = {
        label: 'Situation professionnelle',
        answers: {}
      };
    }

    $scope.subSectionModel = $scope.sectionModel.situation.answers;
  });
