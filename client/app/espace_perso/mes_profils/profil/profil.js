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
      profileId: function($stateParams) {
        return $stateParams.profileId;
      }
    }
  });
});
