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
        resolve: {
          currentProfil: function($http, $stateParams, ProfileResource, currentUser) {
            return ProfileResource.get({userId: currentUser._id, id: $stateParams.profilId}).$promise;
          },

          // demandes: function($http, $stateParams, RequestResource) {
          // return $http.get(`/api/users/${currentUser._id}/profiles/${profil._id}/requests`).then(function(result) {
          // return result.data;
          // })
          // }
        }
      });
  });
