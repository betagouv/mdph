'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DateNaissanceCtrl
 * @description
 * # DateNaissanceCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DateNaissanceCtrl', function($scope) {
    $scope.subtitle = $scope.estRepresentant() ? 'Quelle est sa date de naissance ?': 'Quelle est votre date de naissance ?';

    if (angular.isUndefined($scope.sectionModel.dateNaissance)) {
      $scope.sectionModel.dateNaissance = {label: 'Date de naissance'};
    }

    $scope.model = $scope.sectionModel.dateNaissance;

    $scope.question = {
      'model': 'value'
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.dateNaissance.value);
    };

    $scope.nextStep = function() {
      $scope.beginForm();
    };
  });
