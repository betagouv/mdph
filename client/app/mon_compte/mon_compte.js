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
        views: {
          '': {
            templateUrl: 'app/mon_compte/mon_compte.html',
            controller: 'MonCompteCtrl',
          },

          'mes_profils@mon_compte': {
            templateUrl: 'app/mon_compte/mes_profils/mes_profils.html',
            controller: 'MesProfilsCtrl',
          }
        }
      });
  });
