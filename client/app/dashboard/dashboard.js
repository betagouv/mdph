'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        parent: 'departement',
        templateUrl: 'app/dashboard/dashboard.html',
        authenticate: true,
        redirectTo: 'dashboard.workflow',
        resolve: {
          currentUser: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        }
      });
  });
