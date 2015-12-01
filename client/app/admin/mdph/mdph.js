'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin.mdph', {
        url: '/mdph/:zipcode',
        templateUrl: 'app/admin/mdph/mdph.html',
        controller: 'AdminMdphCtrl',
        authenticate: true,
        resolve: {
          mdph: function($stateParams, MdphResource) {
            return MdphResource.get({zipcode: $stateParams.zipcode});
          }
        }
      });
  });
