'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ScolaireCtrl
 * @description
 * # ScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ScolaireCtrl', function ($scope, estRepresentant) {
    $scope.title = 'Votre scolarité';

    $scope.section = 'votre_scolarite';

    if (angular.isUndefined($scope.data.scolaire)) {
      $scope.data.scolaire = {
        sectionLabel: 'Votre scolarité',
        answers: {}
      };
    }

    $scope.estRepresentant = function() {
      return estRepresentant($scope.data.contexte);
    };

    $scope.getLabel = function(answer) {
      if ($scope.estRepresentant() && answer.labelRep) {
        return answer.labelRep;
      }
      return answer.label;
    };

    $scope.sectionModel = $scope.data.scolaire;
  });
