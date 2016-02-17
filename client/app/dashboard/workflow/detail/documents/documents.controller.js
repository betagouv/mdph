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

      type = null;
      $scope.selected = null;
    };

    $scope.removeSelectedType = function(idx) {
      request.askedDocumentTypes.splice(idx, 1);
    };

    $scope.save = function(isSuccess) {
      var newStatus = isSuccess ? 'enregistree' : 'en_attente_usager';

      var action = {
        user: currentUser._id,
        new: newStatus,
        old: request.status,
        comments: request.comments,
        internalNumber: request.internalNumber,
        refusedDocuments: RequestService.findRefusedDocuments(request),
        askedDocumentTypes: RequestService.getAskedDocumentTypes(request)
      };

      request.status = newStatus;
      request.$update(action);
    };
  });
