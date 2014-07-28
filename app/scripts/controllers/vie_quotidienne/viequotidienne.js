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
    $scope.title = $scope.estRepresentant() ? 'Sa vie quotidienne' : 'Votre vie quotidienne';

    if (angular.isUndefined($scope.$storage.vie)) {
      $scope.$storage.vie = {
        sectionLabel: $scope.title,
        answers: {}
      };
    }
    $scope.sectionModel = $scope.$storage.vie.answers;
  });
