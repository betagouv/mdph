'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.workflow.list', {
        url: '/:status',
        templateUrl: 'app/dashboard/workflow/list/list.html',
        controller: 'WorkflowListCtrl',
        controllerAs: 'workflowListCtrl',
        resolve: {
          status: function($stateParams) {
            return $stateParams.status;
          },

          requests: function($stateParams, MdphResource, currentMdph, status) {
            return MdphResource.queryRequests({zipcode: currentMdph.zipcode, status: status}).$promise;
          },

          groupedByAge: function(RequestService, requests) {
            return RequestService.groupByAge(requests);
          }
        },
        authenticate: true
      });
  });
