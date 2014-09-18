'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.users', {
        url: '/utilisateurs',
        templateUrl: 'app/dashboard/users/users.html',
        controller: 'UsersCtrl',
        resolve: {
          /*users: function(Mdph, Auth) {
            return Mdph.queryUsers();
          }*/

          users: function() {
            return [{name: 'Alice', email: 'alice@alice.com', role: 'adminMdph'}, {name: 'Bob', email: 'bob@bob.com', role: 'user'}, {name: 'Flo', email: 'flo@flo.com', role: 'user'}]
          }
        }
      });
  });
