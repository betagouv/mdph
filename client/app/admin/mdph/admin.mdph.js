'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin.mdph', {
        url: '/mdph',
        parent: 'admin',
        authenticate: true,
        templateUrl: 'app/admin/mdph/admin.mdph.html',
        controller: 'AdminMdphCtrl',
        controllerAs: 'adminMdphCtrl',
        resolve: {
          mdphs: function(MdphResource) {
            return MdphResource.query().$promise;
          }
        }
      });
  });
