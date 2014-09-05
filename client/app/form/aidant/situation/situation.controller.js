'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SituationAidantCtrl
 * @description
 * # SituationAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SituationAidantCtrl', function ($scope) {
    $scope.$parent.hideSubsections = false;

    if (angular.isUndefined($scope.sectionModel.situation)) {
      $scope.sectionModel.situation = {
        label: 'Votre situation',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.sectionModel.situation.answers;
  });
