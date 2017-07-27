'use strict';

angular.module('impactApp')
  .component('menuDashboard', {
    bindings: {
      mdph: '<'
    },
    templateUrl: 'components/menu-dashboard/menu-dashboard.html',
    controllerAs: 'menudashboardctrl',
    controller($state, $rootScope, updateRequestCount, MdphResource, BanettesConstant) {
      this.getMenuSliderClass = () => $state.includes('dashboard.workflow.detail') ? 'show-detail' : 'show-general';

      updateRequestCount.exec = () => {
        MdphResource.queryTotalRequestsCount({zipcode: this.mdph.zipcode}).$promise.then((result) => {
          var requestCountByStatus = _.indexBy(result, '_id');
          BanettesConstant.forEach((banette) => {
            if (requestCountByStatus[banette.id]) {
              banette.count = requestCountByStatus[banette.id].count;
            } else {
              banette.count = 0;
            }
          });

          this.banettes = BanettesConstant;
        });
      };

      $rootScope.$emit('event:updateRequestCount');
    }
  })
  .factory("updateRequestCount", function($rootScope) {
    const updateRequestCount = {
      exec: () => {}
    };

    $rootScope.$on("event:updateRequestCount", () => {
      updateRequestCount.exec();
    });

    return updateRequestCount;
});
