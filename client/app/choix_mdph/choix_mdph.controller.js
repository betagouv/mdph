'use strict';

angular.module('impactApp')
  .controller('ChoixMdphCtrl', function ($scope, $state, $filter, mdphs, RequestService) {
    $scope.mdphs = mdphs;
    $scope.regions = _.groupBy(mdphs, 'nom_de_la_region');

    $scope.filterRegions = function() {
      if (!$scope.query) {
        return $scope.regions;
      }

      var filteredRegions = {};
      angular.forEach($scope.regions, function(mdphs, region) {
        if ($filter('filter')(mdphs, $scope.query).length > 0) {
          filteredRegions[region] = mdphs;
        }
      });

      return filteredRegions;
    };

    $scope.resetCurrentRequest = function(mdph) {
      RequestService.resetCurrent(function () {
        $state.go('departement.questionnaire.question_renouvellement', {codeDepartement: mdph.code_departement});
      });
    };
});
