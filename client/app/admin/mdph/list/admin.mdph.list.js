'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin.mdph.list', {
        url: '/mdph/list',
        parent: 'admin',
        authenticate: true,
        authorized: ['admin'],
        templateUrl: 'app/admin/mdph/list/admin.mdph.list.html',
        controller: 'AdminMdphListCtrl',
        controllerAs: 'adminMdphListCtrl',
        resolve: {
          mdphs: function(MdphResource) {
            return MdphResource.query().$promise;
          }
        }
      });
  });
