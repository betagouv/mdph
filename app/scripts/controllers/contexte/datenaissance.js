'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DateNaissanceCtrl
 * @description
 * # DateNaissanceCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DateNaissanceCtrl', function($scope, $state, datepickerConfig) {
    $scope.subtitle = $scope.estRepresentant() ? 'Quelle est sa date de naissance ?': 'Quelle est votre date de naissance ?';

    if (angular.isUndefined($scope.sectionModel.dateNaissance)) {
      $scope.sectionModel.dateNaissance = {label: 'Date de naissance'};
    }

    datepickerConfig.datepickerMode = 'year';

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.dateNaissance.value);
    };

    $scope.nextStep = function() {
      $state.go('^.^.situations_urgentes.urgences');
    };
  });
