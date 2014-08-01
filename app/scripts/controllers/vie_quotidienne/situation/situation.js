'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SituationVieCtrl
 * @description
 * # SituationVieCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SituationVieCtrl', function ($scope) {

    if (angular.isUndefined($scope.$storage.vie.answers.situation)) {
      $scope.$storage.vie.answers.situation = {
        label: 'Votre situation',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.vie.answers.situation.answers;
  });
