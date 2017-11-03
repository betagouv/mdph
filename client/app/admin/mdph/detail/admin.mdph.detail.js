'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin.mdph.detail', {
        url: '/mdph/detail',
        parent: 'admin',
        authenticate: true,
        templateUrl: 'app/admin/mdph/detail/admin.mdph.detail.html',
        controller: 'AdminMdphDetailCtrl',
        controllerAs: 'adminMdphDetailCtrl',
        resolve: {
          mdph: function(MdphResource, $stateParams) {
            var zipcode = $stateParams.zipcode;
            if (zipcode) {
                return MdphResource.get({zipcode: zipcode}).$promise;
            } else {
              return {};
            }
          }
        }
      });
  });
