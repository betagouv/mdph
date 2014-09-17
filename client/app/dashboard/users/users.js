'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.users', {
        url: '/utilisateurs',
        templateUrl: 'app/dashboard/users/users.html',
        controller: 'UsersCtrl',
        resolve: {
          /* users: function(Mdph, Auth) {
            return Mdph.query({ id: Auth.getCurrentUser().mdph._id });
          } */

          users: function() {
            return [{name: 'Alice', email: 'alice@mdph59.org', role: 'adminMdph'}, {name: 'bob', email: 'bob@gmail.com', role: 'user'}];
          }
        }
      });
  });
