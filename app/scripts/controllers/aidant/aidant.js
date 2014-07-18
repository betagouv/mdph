'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AidantCtrl
 * @description
 * # AidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AidantCtrl', function ($scope, estRepresentant) {
    $scope.title = 'Votre aidant';

    $scope.section = 'votre_aidant';

    if (angular.isUndefined($scope.data.aidant)) {
      $scope.data.aidant = {};
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
    
    $scope.sectionModel = $scope.data.aidant;
  });
