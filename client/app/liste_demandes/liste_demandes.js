'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('liste_demandes', {
        url: '/liste_demandes',
        templateUrl: 'app/liste_demandes/liste_demandes.html',
        controller: 'ListeDemandesCtrl',
        authenticate: true,
        resolve: {
          requests:  function(User) {
            return User.queryRequests().$promise;
          }
        }
      });
  });
