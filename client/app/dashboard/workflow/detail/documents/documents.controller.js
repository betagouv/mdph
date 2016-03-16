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

    $scope.preview = function(isSuccess) {
      return RequestService.postAction(request, {
        id: isSuccess ? 'preview_succes_enregistrement' : 'preview_erreur_enregistrement',
        comments: request.comments,
        numeroDossier: request.numeroDossier,
        refusedDocuments: RequestService.findRefusedDocuments(request),
        askedDocumentTypes: RequestService.getAskedDocumentTypes(request)
      }).then(html => {
        $scope.previewMail = html;
      });
    };

    $scope.save = function(isSuccess) {
      return RequestService.postAction(request, {
        id: isSuccess ? 'succes_enregistrement' : 'erreur_enregistrement',
        comments: request.comments,
        numeroDossier: request.numeroDossier,
        refusedDocuments: RequestService.findRefusedDocuments(request),
        askedDocumentTypes: RequestService.getAskedDocumentTypes(request)
      }).then(() => {
        $state.go('.', {}, {reload: true});
      });
    };
  });
