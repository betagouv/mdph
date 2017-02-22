'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('departement', {
        parent: 'layout',
        url: '',
        resolve: {
          currentUser: function(Auth) {
            return Auth.getCurrentUser().$promise;
          }
        },
        views: {
          '': {
            templateUrl: 'app/departement/departement.html',
            controller: 'DepartementCtrl',
          },

          'mes_profils@departement': {
            templateUrl: 'app/mon_compte/mes_profils/mes_profils.html',
            controller: 'MesProfilsCtrl',
          }
        }
      });
  });
