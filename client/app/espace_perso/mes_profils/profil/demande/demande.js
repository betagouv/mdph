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
      },

      request: function(RequestResource, shortId) {
        return RequestResource.get({shortId: shortId}).$promise;
      }
    },
    views: {
      '': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/demande.html',
        controller: function($scope, $filter, RequestResource, mdphs, shortId, request) {
          $scope.mdphs = mdphs;
          $scope.request = request;
        },
      },
      'obligatoires@espace_perso.mes_profils.profil.demande': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/documents/obligatoires.html',
        controller: 'DocumentsObligatoiresCtrl',
        resolve: {
          documentTypes: function(DocumentResource) {
            return DocumentResource.query({type: 'obligatoires'}).$promise;
          }
        }
      },
      'complementaires@espace_perso.mes_profils.profil.demande': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/documents/complementaires.html',
        controller: 'DocumentsComplementairesCtrl',
        resolve: {
          documentTypes: function(DocumentResource) {
            return DocumentResource.query({type: 'complementaires'}).$promise;
          }
        }
      },
      'suggestions@espace_perso.mes_profils.profil.demande': {
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/documents/suggestions.html',
        controller: function($scope, PreparationEvaluationService, request) {
          $scope.docsList = PreparationEvaluationService.getSuggestedDocsList(request.formAnswers);
        }
      }
    }
  });
});
