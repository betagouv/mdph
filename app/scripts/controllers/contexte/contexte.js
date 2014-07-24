'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ContexteCtrl
 * @description
 * # ContexteCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ContexteCtrl', function ($sessionStorage, $scope) {

    $scope.currentSection = $scope.$storage.sectionContexte;

    $scope.beginForm = function() {
      $scope.$storage.sectionVieQuotidienne.isEnabled = true;
      $scope.goToNextSection($scope.currentSection);
    };

    if (angular.isUndefined($scope.$storage.contexte)) {
      $scope.$storage.contexte = {
        sectionLabel: 'Contexte',
        answers: {}
      };
    }

    $scope.getLabel = function(answer) {
      if ($scope.estRepresentant() && answer.labelRep) {
        return answer.labelRep;
      }
      return answer.label;
    };

    $scope.sectionModel = $scope.$storage.contexte.answers;
  });
