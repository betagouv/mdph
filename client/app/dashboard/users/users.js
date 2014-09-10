'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.users', {
        url: '/',
        templateUrl: 'app/dashboard/users/users.html',
        controller: 'UsersCtrl',
        resolve: {
          users: function(Mdph, Auth) {
            return Mdph.query({ id: Auth.getCurrentUser().mdph._id });
          }
        }
      });
  });
