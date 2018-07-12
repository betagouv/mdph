'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('demande.documents', {
    url: '/documents',
    templateUrl: 'app/demande/documents/documents.html',
    controller: 'DemandeDocumentsCtrl',
    controllerAs: 'demandeDocumentsCtrl',
    authenticate: true,
    authorized: ['user'],
    protected: true,
    resolve: {
      documentTypes: function(DocumentTypeResource) {
        return DocumentTypeResource.query().$promise;
      }
    }
  });
});
