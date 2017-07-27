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

          requests: function($stateParams, MdphResource, currentMdph, userId, status) {
            return MdphResource.queryRequests({zipcode: currentMdph.zipcode, controllerid: userId, status}).$promise;
          },

          groupedByAge: function(RequestService, requests) {
            return RequestService.groupByAge(requests);
          }
        },
        authenticate: true
      });
  });
