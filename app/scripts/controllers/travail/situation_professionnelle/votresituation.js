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

    if (angular.isUndefined($scope.travailModel.situation)) {
      $scope.travailModel.situation = {
        label: 'Situation professionnelle',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.travailModel.situation.answers;
  });
