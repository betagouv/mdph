'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('layout', {
        url: '',
        resolve: {
          user: function(Auth) {
            return Auth.getCurrentUser().$promise;
          },

          mdphs: function(MdphResource) {
            return MdphResource.query({enabled: true}).$promise;
          }
        },
        templateUrl: 'app/layout/layout.html',
        controller: 'LayoutCtrl',
        abstract: true
      });
  });
