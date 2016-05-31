'use strict';

angular.module('impactApp')
  .component('menuDashboard', {
    bindings: {
      mdph: '<'
    },
    templateUrl: 'components/menu-dashboard/menu-dashboard.html',
    controller($scope, $rootScope, SectionBackConstants, BanettesConstant, MdphResource, Auth, $state) {
      $scope.sections = SectionBackConstants;
      $scope.state = $state;
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.getCurrentUser = Auth.getCurrentUser;
      $scope.mdph = this.mdph;

      const refreshBanettes = () => {
        if ($scope.mdph && $state.includes('dashboard')) {
          MdphResource.queryTotalRequestsCount({zipcode: $scope.mdph.zipcode}).$promise.then((result) => {
            var requestCountByStatus = _.indexBy(result, '_id');
            BanettesConstant.forEach((banette) => {
              if (requestCountByStatus[banette.id]) {
                banette.count = requestCountByStatus[banette.id].count;
              } else {
                banette.count = 0;
              }
            });

            $scope.banettes = BanettesConstant;
          });
        }
      };

      $rootScope.$on('refreshMenu', refreshBanettes);
      refreshBanettes();
    }
  });
