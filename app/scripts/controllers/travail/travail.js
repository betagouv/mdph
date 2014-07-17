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
    $scope.title = 'Votre travail';

    $scope.section = 'votre_travail';
    
    if (angular.isUndefined($scope.data.travail)) {
      $scope.data.travail = {
        sectionLabel: 'Votre situation professionnelle',
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

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.section);
    };

    $scope.model = $scope.data.travail;
  });
