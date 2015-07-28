'use strict';

angular.module('impactApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('espace_perso.liste_demandes', {
        url: '/liste_demandes',
        templateUrl: 'app/espace_perso/liste_demandes/liste_demandes.html',
        controller: 'ListeDemandesCtrl',
        authenticate: true,
        resolve: {
          requests: function(User) {
            return User.queryRequests().$promise;
          }
        }
      });
  });
