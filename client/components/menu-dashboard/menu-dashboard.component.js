'use strict';

angular.module('impactApp')
  .component('menuDashboard', {
    bindings: {
      mdph: '<',
      currentUser: '<',
      navUserId: '@',
      navStatus: '@'
    },
    templateUrl: 'components/menu-dashboard/menu-dashboard.html',
    controllerAs: 'menudashboardctrl',
    controller($state, $rootScope, updateRequestCount, MdphResource, BanettesConstant) {
      this.banettes = BanettesConstant;
      this.getMenuSliderClass = () => $state.includes('dashboard.workflow.detail') ? 'show-detail' : 'show-general';

      updateRequestCount.exec = () => {
        MdphResource.queryTotalRequestsCount({zipcode: this.mdph.zipcode}).$promise.then(results => {
          const menu = [];

          results.forEach(result => {
            if (result.user._id === this.currentUser._id || result.user._id === 'toutes') {
              result.groupsById = _.indexBy(result.groups, '_id');
              menu.push(result);
            }
          });

          this.totalRequestsCount = menu;
        });
      };

      $rootScope.$emit('event:updateRequestCount');
    }
  })
  .factory('updateRequestCount', function($rootScope) {
    const updateRequestCount = {
      exec: () => {}
    };

    $rootScope.$on('event:updateRequestCount', () => {
      updateRequestCount.exec();
    });

    return updateRequestCount;
  });
