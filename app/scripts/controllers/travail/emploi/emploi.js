'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiCtrl
 * @description
 * # EmploiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiCtrl', function($scope) {

    if (angular.isUndefined($scope.sectionModel.emploi)) {
      $scope.sectionModel.emploi = {
        label: $scope.subtitle,
        answers: {}
      };
    }

    $scope.subSectionModel = $scope.sectionModel.emploi.answers;
  });
