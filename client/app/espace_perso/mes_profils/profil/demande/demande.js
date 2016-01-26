'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('espace_perso.mes_profils.profil.demande', {
    url: '/demande/:shortId',
    authenticate: true,
    data: {
      title: 'Détail de la demande'
    },

    resolve: {
      shortId: function($stateParams) {
        return $stateParams.shortId;
      },

      request: function(RequestResource, shortId) {
        return RequestResource.get({shortId: shortId}).$promise;
      }
    },

    templateUrl: 'app/espace_perso/mes_profils/profil/demande/demande.html',

    controller: function($scope, $state, currentUser, request) {
      $scope.request = request;
      $scope.currentUser = currentUser;
    }
  });
});
