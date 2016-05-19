'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workflow', {
        url: '/workflow',
        templateUrl: 'app/dashboard/workflow/workflow.html',
        controller: 'WorkflowCtrl',
        redirectTo: {
          url: 'dashboard.workflow.list',
          params: {
            status: 'emise'
          }
        },
        resolve: {
          requestCountByStatus: function(MdphResource, currentMdph) {
            return MdphResource.queryTotalRequestsCount({zipcode: currentMdph.zipcode}).$promise.then(function(result) {
              return _.indexBy(result, '_id');
            });
          },

          visibleBanettes: function(BanettesConstant) {
            return _.filter(BanettesConstant, function(banette) {
              return banette.id !== 'hidden';
            });
          },

          visibleBanettesWithCount: function(visibleBanettes, requestCountByStatus) {
            visibleBanettes.forEach(function(banette) {
              banette.statuses.forEach(function(status) {
                if (requestCountByStatus[status.id]) {
                  status.count = requestCountByStatus[status.id].count;
                } else {
                  status.count = 0;
                }
              });
            });

            return visibleBanettes;
          }
        },
        authenticate: true
      });
  });
