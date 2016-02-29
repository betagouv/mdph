'use strict';

angular.module('impactApp')
  .controller('RequestDocumentsCtrl', function($scope, RequestService, request, documentTypes, currentUser) {
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

    $scope.save = function(isSuccess) {
      var newStatus = isSuccess ? 'enregistree' : 'en_attente_usager';

      var action = {
        id: isSuccess ? 'succes_enregistrement' : 'erreur_enregistrement',
        user: currentUser._id,
        newStatus: newStatus,
        oldStatus: request.status,
        comments: request.comments,
        numeroDossier: request.numeroDossier,
        refusedDocuments: RequestService.findRefusedDocuments(request),
        askedDocumentTypes: RequestService.getAskedDocumentTypes(request)
      };

      request.status = newStatus;
      request.$save(action);
    };
  });
