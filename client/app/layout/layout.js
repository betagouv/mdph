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
          }
        },
        templateUrl: 'app/layout/layout.html',
        controller: 'LayoutCtrl',
        abstract: true
      });
  });
