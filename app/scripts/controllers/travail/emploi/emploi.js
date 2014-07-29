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

    if (angular.isUndefined($scope.travailModel.emploi)) {
      $scope.travailModel.emploi = {
        label: 'Emploi, détails',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.travailModel.emploi.answers;
  });
