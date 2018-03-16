'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workflow.list', {
        url: '/:userId/:status',
        templateUrl: 'app/dashboard/workflow/list/list.html',
        controller: 'WorkflowListCtrl',
        controllerAs: 'workflowListCtrl',
        resolve: {
          status: function($stateParams) {
            return $stateParams.status;
          },

          userId: function($stateParams) {
            return $stateParams.userId;
          },

          requests: function(MdphResource, currentMdph, userId, status) {
            return MdphResource.queryRequests({zipcode: currentMdph.zipcode, controllerid: userId, status}).$promise;
          },

          groupedByAge: function(RequestService, requests) {
            return RequestService.groupByAge(requests);
          },

          banetteUser: function(User, userId) {
            if (userId === 'toutes') {
              return { name: 'Toutes les demandes '};
            }

            return User.get({id: userId}).$promise;
          }
        },
        authenticate: true,
        authorized: ['adminMdph']
      });
  });
