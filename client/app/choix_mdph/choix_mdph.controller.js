'use strict';

angular.module('impactApp')
  .controller('ChoixMdphCtrl', function ($scope, $filter, mdphs) {
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
});
