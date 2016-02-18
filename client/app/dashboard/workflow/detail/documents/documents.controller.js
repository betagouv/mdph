'use strict';

angular.module('impactApp')
  .controller('RequestDocumentsCtrl', function($scope, RequestService, request, documentTypes, currentUser) {
    $scope.documentTypes = documentTypes;
    $scope.demandeTypesComplementaires = [];

    function alreadySelected(type) {
      return _.find($scope.demandeTypesComplementaires, function(current) {
        return current.id === type.id;
      });
    }

    $scope.addSelectedType = function(type) {
      if (!alreadySelected(type)) {
        $scope.demandeTypesComplementaires.push(type);
      }

      $scope.selected = null;
    };

    $scope.removeSelectedType = function(idx) {
      $scope.demandeTypesComplementaires.splice(idx, 1);
    };

    $scope.save = function(form, isSuccess) {
      var newStatus = isSuccess ? 'enregistree' : 'en_attente_usager';

      var action = {
        new: newStatus,
        user: currentUser._id,
        old: request.status
      };

      if (isSuccess) {
        request.internalNumber = action.internalNumber = form.internalNumber.$modelValue;
      } else {
        var refusedDocuments = RequestService.findRefusedDocuments(request);
        var askedDocumentTypes = RequestService.getAskedDocumentTypes(request);

        action.comments = request.comments;
      }

      request.status = newStatus;
      request.$update(action);
    };
  });
