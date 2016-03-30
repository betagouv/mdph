'use strict';

angular.module('impactApp')
  .controller('DocumentsCtrl', function($scope, $modal, UploadService, RequestService, request, documentTypes, currentUser) {
    $scope.request = request;
    $scope.selectedDocumentTypes = RequestService.computeSelectedDocumentTypes(request, documentTypes);
    $scope.user = currentUser;

    $scope.getText = function(documentType) {
      if (documentType.mandatory || documentType.asked) {
        return 'Obligatoire';
      }

      return null;
    };

    $scope.getClass = function(documentType) {
      if (documentType.mandatory || documentType.asked) {
        return 'mandatory';
      }

      return '';
    };

    $scope.getDocuments = function(currentDoc) {
      var documents = $scope.request.documents;
      var documentId = currentDoc.id;

      if (documents.obligatoires[documentId]) {
        return documents.obligatoires[documentId].documentList;
      } else if (documents.complementaires[documentId]) {
        return documents.complementaires[documentId].documentList;
      }
    };

    $scope.upload = function(file, documentType) {
      UploadService.upload(request, file, documentType);
    };

    $scope.chooseType = function() {
      var modalInstance = $modal.open({
        templateUrl: 'app/espace_perso/mes_profils/profil/demande/documents/modal_type.html',
        controller: 'ChooseTypeModalInstanceCtrl',
        resolve: {
          filteredDocumentTypes: function() {
            var filtered = _.filter(documentTypes, function(type) {
              return typeof _.find($scope.selectedDocumentTypes, {id: type.id}) === 'undefined';
            });

            return filtered;
          }
        }
      });

      modalInstance.result.then(function(selected) {
        $scope.selectedDocumentTypes.push(selected);
      });
    };
  })
  .controller('ChooseTypeModalInstanceCtrl', function($scope, $modalInstance, filteredDocumentTypes) {
    $scope.filteredDocumentTypes = filteredDocumentTypes;

    $scope.select = function(selected) {
      $modalInstance.close(selected);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
