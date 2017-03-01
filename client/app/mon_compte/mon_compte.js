'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('mon_compte', {
        url: '/mon_compte',
        parent: 'departement',
        authenticate: true,
        data: {
          title: 'Mon compte'
        },
        resolve: {
          currentUser: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        },
        templateUrl: 'app/mon_compte/mon_compte.html',
        controller: 'MonCompteCtrl',
      });
  });
