'use strict';

angular.module('impactApp')
  .component('menuDashboard', {
    bindings: {
      mdph: '<'
    },
    templateUrl: 'components/menu-dashboard/menu-dashboard.html',
    controllerAs: 'md',
    controller(SectionBackConstants, BanettesConstant, MdphResource, MenuCollapsed) {
      this.sections = SectionBackConstants;

      var visibleBanettes = _.filter(BanettesConstant, function(banette) {
        return banette.id !== 'hidden';
      });

      MdphResource.queryTotalRequestsCount({zipcode: this.mdph.zipcode}).$promise.then((result) => {
        var requestCountByStatus = _.indexBy(result, '_id');
        visibleBanettes.forEach((banette) => {
          banette.statuses.forEach((status) => {
            if (requestCountByStatus[status.id]) {
              status.count = requestCountByStatus[status.id].count;
            } else {
              status.count = 0;
            }
          });
        });

        this.banettes = visibleBanettes;
      });

      this.isCollapsed = MenuCollapsed.isCollapsed;
    }
  });
