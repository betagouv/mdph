'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('profil', {
    url: '/profil/:profileId',
    parent: 'departement',
    templateUrl: 'app/profil/profil.html',
    controller: 'ProfilCtrl',
    authenticate: true,
    data: {
      title: 'Détail du profil'
    },
    resolve: {
      currentUser: function(Auth) {
        return Auth.getCurrentUser().$promise;
      },

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

      currentRequest: function($http, currentUser, profile) {
        return $http.get(`/api/users/${currentUser._id}/profiles/${profile._id}/requests/current`).then(function(result) {
          return result.data;
        },

        function() {
          // No request found, no worries
          return null;
        });
      },

      hasRequest: function($http, currentUser, profile) {
        return $http.get(`/api/users/${currentUser._id}/profiles/${profile._id}/requests/count`).then(function(result) {
          return result.data;
        });
      }
    }
  });
});
