'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SansEmploiCtrl
 * @description
 * # SansEmploiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SansEmploiCtrl', function($scope) {

    if (angular.isUndefined($scope.travailModel.sansEmploi)) {
      $scope.travailModel.sansEmploi = {
        label: 'Sans emploi, détails',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.travailModel.sansEmploi.answers;
  });
