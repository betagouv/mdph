'use strict';

angular.module('impactApp')
  .controller('AttenteStructureCtrl', function ($scope, $state) {

    $scope.subtitle = 'Avez-vous déjà identifié une ou plusieurs structures qui pourraient répondre à vos attentes?';

    if (angular.isUndefined($scope.sectionModel.structure)) {
      $scope.sectionModel.structure = {
        valeur: false,
        structures: [
          {'name': '', 'contact': false}
        ]
      };
    }

    $scope.model = $scope.sectionModel.structure;
    $scope.addStructure = function() {
      $scope.model.structures.push(
        {'name': '', 'contact': false}
      );
    };

    $scope.nextStep = function() {
      $state.go('^.autres_renseignements');
    };
  });
