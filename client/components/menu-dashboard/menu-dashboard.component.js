'use strict';

angular.module('impactApp')
  .component('menuDashboard', {
    bindings: {
      mdph: '<'
    },
    templateUrl: 'components/menu-dashboard/menu-dashboard.html',
    controllerAs: 'md',
    controller(SectionBackConstants, BanettesConstant, MdphResource, MenuCollapsed, Auth, $state) {
      this.sections = SectionBackConstants;
      this.state = $state;
      this.isLoggedIn = Auth.isLoggedIn;
      this.getCurrentUser = Auth.getCurrentUser;

      // this.detail = $state.includes('dashboard.workflow.detail');

      if (this.mdph && $state.includes('dashboard')) {
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
      }

      this.isCollapsed = MenuCollapsed.isCollapsed;
    }
  });
