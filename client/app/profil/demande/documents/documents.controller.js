'use strict';

const DOCUMENT_CONTROLLER_NAME = 'DocumentsCtrl';

angular.module('impactApp')
  .controller(DOCUMENT_CONTROLLER_NAME, class documentController {
    constructor($scope, $modal, toastr, UploadService, RequestService, request, documentTypes, currentUser) {
      this.$modal = $modal;
      this.request = request;
      this.user = currentUser;
      this.documentTypes = documentTypes;
      this.selectedDocumentTypes = RequestService.computeSelectedDocumentTypes(request, documentTypes);
      this.upload = (file, documentType) => UploadService.upload(request, file, documentType);

      $scope.$on('file-upload-error', function() {
        toastr.error('Types de documents acceptés : images (jpg, png) et pdf', 'Erreur lors de l\'envoi du document');
      });
    }

    getText(documentType) {
      if (documentType.mandatory || documentType.asked) {
        return 'Obligatoire';
      }

      return null;
    }

    getClass(documentType) {
      if (documentType.mandatory || documentType.asked) {
        return 'mandatory';
      }

      return '';
    }

    getDocuments(currentDoc) {
      var documents = this.request.documents;
      var documentId = currentDoc.id;

      if (documents.obligatoires[documentId]) {
        return documents.obligatoires[documentId].documentList;
      } else if (documents.complementaires[documentId]) {
        return documents.complementaires[documentId].documentList;
      }
    }

    createModalComponent() {
      return {
        templateUrl: 'app/profil/demande/documents/modal_type.html',
        controller: ($scope, $modalInstance, filteredDocumentTypes) => {
          $scope.filteredDocumentTypes = filteredDocumentTypes;

          $scope.select = function(selected) {
            $modalInstance.close(selected);
          };

          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        },
        resolve: {
          filteredDocumentTypes: () => {
            return _.filter(this.documentTypes, (type) => typeof _.find(this.selectedDocumentTypes, {id: type.id}) === 'undefined');
          }
        }
      };
    }

    chooseType() {
      const modalComponent = this.createModalComponent();
      const modalInstance = this.$modal.open(modalComponent);

      modalInstance.result.then((selected) => this.selectedDocumentTypes.push(selected));
    }

    static get $inject() {
      return [
        '$scope',
        '$modal',
        'toastr',
        'UploadService',
        'RequestService',
        'request',
        'documentTypes',
        'currentUser'
      ];
    }
  }
);
