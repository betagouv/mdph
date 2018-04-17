'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        parent: 'layout',
        template: '<div class="dashboard-container"><ui-view /></div>',
        authenticate: true,
        authorized: ['adminMdph'],
        redirectTo: 'dashboard.workflow',
        resolve: {
          currentUser: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        }
      });
  });
