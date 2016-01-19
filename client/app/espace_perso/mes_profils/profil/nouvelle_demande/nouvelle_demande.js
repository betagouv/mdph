'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('espace_perso.mes_profils.profil.demande', {
    url: '/demande/:shortId',
    authenticate: true,
    data: {
      title: 'Nouvelle demande'
    },

    resolve: {
      mdphs: function($http) {
        return $http.get('/api/mdphs/list').then(function(result) {
          return _.filter(result.data, {enabled: true});
        });
      },

      shortId: function($stateParams) {
        return $stateParams.shortId;
      }
    },
    views: {
      '': {
        templateUrl: 'app/espace_perso/mes_profils/profil/nouvelle_demande/nouvelle_demande.html',
        controller: function($scope, $filter, RequestResource, mdphs, shortId) {
          $scope.mdphs = mdphs;
          $scope.request = RequestResource.get({shortId: shortId});
        },
      },
      'obligatoires@espace_perso.mes_profils.profil.nouvelle_demande': {
        templateUrl: 'app/espace_perso/mes_profils/profil/nouvelle_demande/documents/obligatoires/obligatoires.html',
        controller: 'DocumentsObligatoiresCtrl',
        resolve: {
          documentTypes: function(DocumentResource) {
            return DocumentResource.query({type: 'obligatoires'}).$promise;
          }
        }
      }
    }
  });
});
