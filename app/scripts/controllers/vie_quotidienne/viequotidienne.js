'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VieQuotidienneCtrl
 * @description
 * # VieQuotidienneCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VieQuotidienneCtrl', function ($scope, $sessionStorage) {

    $scope.currentSection = $sessionStorage.sectionVieQuotidienne;

    if (angular.isUndefined($scope.$storage.vie)) {
      $scope.$storage.vie = {
        sectionLabel: $scope.currentSection.label,
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.vie.answers;
  });
