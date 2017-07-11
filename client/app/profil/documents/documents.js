'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('profil.documents', {
    url: '/documents',
    templateUrl: 'app/profil/documents/documents.html',
    controller: 'DocumentsCtrl',
    controllerAs: 'documentsCtrl',
    resolve: {
      documentTypes: function(DocumentTypeResource) {
        return DocumentTypeResource.query().$promise;
      }
    }
  });
});
