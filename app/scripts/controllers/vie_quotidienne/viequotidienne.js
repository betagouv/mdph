'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VieQuotidienneCtrl
 * @description
 * # VieQuotidienneCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VieQuotidienneCtrl', function ($scope, estRepresentant) {
    $scope.title = 'Vie quotidienne';
    
    $scope.section = 'vie_quotidienne';

    if (angular.isUndefined($scope.data.vie)) {
      $scope.data.vie = {
        sectionLabel: 'Vie quotidienne',
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

    $scope.sectionModel = $scope.data.vie.answers;
  });
