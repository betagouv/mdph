'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:BesoinsVieCtrl
 * @description
 * # BesoinsVieCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('BesoinsVieCtrl', function ($scope) {

    if (angular.isUndefined($scope.$storage.vie.answers.besoins)) {
      $scope.$storage.vie.answers.besoins = {
        label: 'Besoins dans la vie quotidienne',
        answers: {}
      };
    }

    $scope.subSectionModel = $scope.$storage.vie.answers.besoins.answers;
  });
