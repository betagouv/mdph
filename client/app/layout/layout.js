'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('layout', {
        url: '/mdph/:codeDepartement',
        resolve: {
          currentMdph: function(MdphResource, $stateParams) {
            if ($stateParams.codeDepartement) {
              return MdphResource.get({zipcode: $stateParams.codeDepartement}).$promise;
            } else {
              return null;
            }
          },

          currentUser: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        },
        templateUrl: 'app/layout/layout.html',
        controller: 'LayoutCtrl',
        controllerAs: 'layoutctrl',
        abstract: true
      });
  });
