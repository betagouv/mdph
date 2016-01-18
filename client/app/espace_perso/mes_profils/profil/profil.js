'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('espace_perso.mes_profils.profil', {
    url: '/profil/:profileId',
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

      estAdulte: function(profile) {
        if (profile.identites && profile.identites.beneficiaire) {
          var dateNaissance = profile.identites.beneficiaire.dateNaissance;
          return moment().diff(dateNaissance, 'years') >= 20;
        } else {
          return true;
        }
      }
    }
  });
});
