'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TravailCtrl
 * @description
 * # TravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TravailCtrl', function ($scope, estRepresentant) {
    $scope.title = 'Vie au travail';

    $scope.sectionId = 'votre_travail';
    
    if (angular.isUndefined($scope.$storage.travail)) {
      $scope.$storage.travail = {
        sectionLabel: 'Vie au travail',
        answers: {}
      };
    }

    $scope.estRepresentant = function() {
      return estRepresentant($scope.$storage.contexte);
    };

    $scope.getLabel = function(answer) {
      if ($scope.estRepresentant() && answer.labelRep) {
        return answer.labelRep;
      }
      return answer.label;
    };

    $scope.sectionModel = $scope.$storage.travail.answers;
  });
