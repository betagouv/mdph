'use strict';

angular.module('impactApp')
  .controller('RequestDocumentsCtrl', function($scope, $state, RequestService, request, documentTypes) {
    $scope.documentTypes = documentTypes;
    $scope.selected = null;

    if (!request.askedDocumentTypes) {
      request.askedDocumentTypes = [];
    }

    function alreadySelected(typeId) {
      return _.find(request.askedDocumentTypes, function(current) {
        return current === typeId;
      });
    }

    $scope.showLabel = function(type) {
      return _.find(documentTypes, {id: type}).label;
    };

    $scope.addSelectedType = function(type) {
      if (!alreadySelected(type.id)) {
        request.askedDocumentTypes.push(type.id);
      }
    };

    $scope.removeSelectedType = function(idx) {
      request.askedDocumentTypes.splice(idx, 1);
    };

    $scope.preview = function() {
      RequestService
        .getMailPreview(request)
        .then(html => {
          $scope.mailPreview = html;
        })
        .catch(err => {
          $scope.mailPreview = err;
        });
    };

    $scope.save = function(isSuccess) {
      return RequestService.postAction(request, {
        id: isSuccess ? 'succes_enregistrement' : 'erreur_enregistrement',
        status: isSuccess ? 'enregistree' : 'en_attente_usager',
        comments: request.comments,
        numeroDossier: request.numeroDossier,
        refusedDocuments: RequestService.findRefusedDocuments(request),
        askedDocumentTypes: RequestService.getAskedDocumentTypes(request)
      }).then(() => {
        $state.go('.', {}, {reload: true});
      });
    };
  });
