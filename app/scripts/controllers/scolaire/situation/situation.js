'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SituationCtrl
 * @description
 * # SituationCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SituationCtrl', function ($scope) {

    if (angular.isUndefined($scope.$storage.scolarite.answers.situation)) {
      $scope.$storage.scolarite.answers.situation = {
        label: 'Votre situation',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.scolarite.answers.situation.answers;
  });
