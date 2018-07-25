'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('gestion_demande', {
        parent: 'layout',
        url: '/gestion_demande/:profilId',
        templateUrl: 'app/gestion/demande/gestion.demande.html',
        controller: 'GestionDemandeCtrl',
        controllerAs: 'gestionDemandeCtrl',
        authenticate: true,
        authorized: ['user'],
        resolve: {
          profil: function($stateParams, ProfileResource, currentUser) {
            return ProfileResource.get({userId: currentUser._id, id: $stateParams.profilId}).$promise;
          },

          demandes: function($http, $stateParams, currentUser) {
            return $http.get(`/api/users/${currentUser._id}/profiles/${$stateParams.profilId}/requests`)
              .then(function(response) {

                return response.data;
              });
          }
        }
      });
  });
