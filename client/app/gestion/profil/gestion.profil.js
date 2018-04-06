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
        authenticate: true,
        authorized: ['user'],
        resolve: {
          profils: function($http, ProfileResource, currentUser) {

            return ProfileResource.query({userId: currentUser._id}).$promise.then(function(profilList) {

              return _.map(profilList, function(profil) { // Ajout du status de la derniere demande
                $http.get(`/api/users/${currentUser._id}/profiles/${profil._id}/requests/current`).then(function({data}) {
                  if (data) {
                    profil.currentRequestStatus = data.status;
                  }
                });

                return profil;
              });

            });

          }
        }
      });
  });
