'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AidantLienCtrl
 * @description
 * # AidantLienCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AidantLienCtrl', function($scope, $state) {

    $scope.subtitle = 'Quel est votre lien avec la personne en situation de handicap ?';

    if (angular.isUndefined($scope.sectionModel.lien)) {
      $scope.sectionModel.lien = {
        label: 'Lien avec la persionne en situation de handicap',
        value: ''
      };
    }

    $scope.model = $scope.sectionModel.lien;

    $scope.isNextStepDisabled = function() {
      return $scope.sectionModel.lien.value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.vie');
    };
  });
