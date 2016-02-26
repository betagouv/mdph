'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('profil', {
    url: '/:profileId',
    parent: 'mes_profils',
    templateUrl: 'app/espace_perso/mes_profils/profil/profil.html',
    controller: 'ProfilCtrl',
    authenticate: true,
    data: {
      title: 'Détail du profil'
    },
    resolve: {
      sections: function($http) {
        return $http.get('/api/sections').then(function(result) {
          return result.data;
        });
      },

      profileId: function($stateParams) {
        return $stateParams.profileId;
      },

      profile: function(ProfileResource, currentUser, profileId) {
        return ProfileResource.get({userId: currentUser._id, id: profileId}).$promise;
      },

      requests: function($http, currentUser, profile) {
        return $http.get('/api/users/' + currentUser._id + '/profiles/' + profile._id + '/requests').then(function(result) {
          return result.data;
        });
      }
    }
  });
});
