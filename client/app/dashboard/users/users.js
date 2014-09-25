'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.users', {
        url: '/utilisateurs',
        templateUrl: 'app/dashboard/users/users.html',
        controller: 'UsersCtrl',
        resolve: {
          users: function(Auth) {
            return Auth.getAllUsers();
          }
        }
      });
  });
