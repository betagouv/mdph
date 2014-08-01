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

    if (angular.isUndefined($scope.$storage.travail.answers.sansEmploi)) {
      $scope.$storage.travail.answers.sansEmploi = {
        label: 'Sans emploi, détails',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.travail.answers.sansEmploi.answers;
  });
