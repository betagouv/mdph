'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin.mdph', {
        url: '/mdph',
         authenticate: true,
        templateUrl: '<div ui-view></div>',
        redirectTo: {
          url: 'admin.mdph.list',
        }
      });
  });
