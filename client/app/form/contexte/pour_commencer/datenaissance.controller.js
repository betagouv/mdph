'use strict';

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
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.situations.particulieres');
    };
  });
