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

    if (angular.isUndefined($scope.$storage.travail.answers.situation)) {
      $scope.$storage.travail.answers.situation = {
        label: 'Situation professionnelle',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.travail.answers.situation.answers;
  });
