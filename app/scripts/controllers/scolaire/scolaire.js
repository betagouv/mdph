'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ScolaireCtrl
 * @description
 * # ScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ScolaireCtrl', function ($scope) {
    $scope.title = 'Votre scolarité';

    $scope.section = 'votre_scolarite';

    if (angular.isUndefined($scope.data.scolaire)) {
      $scope.data.scolaire = {
        sectionLabel: 'Votre scolarité',
        answers: {}
      };
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.section);
    };

    $scope.model = $scope.data.scolaire;
  });
