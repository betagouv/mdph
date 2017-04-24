'use strict';

const DOCUMENT_CONTROLLER_NAME = 'DocumentsCtrl';

class documentController {
  constructor($scope, $modal, toastr, UploadService, RequestService, request, documentTypes, currentUser) {
    this.$modal = $modal;
    this.request = request;
    this.user = currentUser;
    this.documentTypes = documentTypes;
    this.UploadService = UploadService;
    this.selectedDocumentTypes = RequestService.computeSelectedDocumentTypes(request, documentTypes);

    $scope.$on('file-upload-error', () => toastr.error('Types de documents acceptés : images (jpg, png) et pdf', 'Erreur lors de l\'envoi du document'));
  }

  upload(file, documentType) {
    this.UploadService.upload(this.request, file, documentType);
  }

  isMandatory(documentType) {
    return (documentType.mandatory || documentType.asked) ? 'mandatory' : '';
  }

  isEmpty(documentType) {
    const documents = this.getDocuments(documentType);

    return documents.length === 0;
  }

  isComplete(documentType) {
    return !this.isEmpty(documentType) && !this.isInvalid(documentType);
  }

  isInvalid(documentType) {
    const documents = this.getDocuments(documentType);

    if (documents.length === 0) {
      return false;
    }

    const rejectedDocuments = _.find(documents, 'isInvalid');
    return typeof rejectedDocuments !== 'undefined';
  }

  getDocuments(currentDoc) {
    var {obligatoires, complementaires} = this.request.documents;
    var documentId = currentDoc.id;

    if (obligatoires[documentId]) {
      return obligatoires[documentId].documentList;
    } else if (complementaires[documentId]) {
      return complementaires[documentId].documentList;
    } else {
      return [];
    }
  }

  createModalComponent() {
    return {
      templateUrl: 'app/profil/demande/documents/modal_type.html',
      controller: ($scope, $modalInstance, filteredDocumentTypes) => {
        $scope.filteredDocumentTypes = filteredDocumentTypes;
        $scope.select = (selected) => $modalInstance.close(selected);
        $scope.cancel = () => $modalInstance.dismiss('cancel');
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

angular.module('impactApp')
  .controller(DOCUMENT_CONTROLLER_NAME, documentController);
