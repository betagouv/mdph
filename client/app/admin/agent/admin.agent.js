'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin.agent', {
        url: '/agent',
        parent: 'admin',
        authenticate: true,
        authorized: ['admin'],
        templateUrl: 'app/admin/agent/admin.agent.html',
        controller: 'AdminAgentCtrl',
        controllerAs: 'adminAgentCtrl',
        resolve: {
          mdphs: function(MdphResource) {
            return MdphResource.query().$promise;
          }
        }
      });
  });
