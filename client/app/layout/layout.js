'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('layout', {
        url: '',
        resolve: {
          mdphs: function(MdphResource) {
            return MdphResource.query({enabled: true}).$promise;
          }
        },
        templateUrl: 'app/layout/layout.html',
        controller: 'LayoutCtrl',
        abstract: true
      });
  });
