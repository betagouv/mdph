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
    $scope.title = 'Votre situation en tant qu\'aidant familial';

    $scope.section = 'votre_aidant';

    if (angular.isUndefined($scope.$storage.aidant)) {
      $scope.$storage.aidant = {
        sectionLabel: $scope.title,
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
    
    $scope.sectionModel = $scope.$storage.aidant.answers;
  });