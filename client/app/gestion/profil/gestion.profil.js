'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('gestion_profil', {
        parent: 'layout',
        url: '/gestion_profil',
        templateUrl: 'app/gestion/profil/gestion.profil.html',
        controller: 'GestionProfilCtrl',
        controllerAs: 'gestionProfilCtrl',
        resolve: {
          profils: function(ProfileResource, currentUser) {
            return ProfileResource.query({userId: currentUser._id}).$promise;
          }
        }
      });
  });
