'use strict';

angular.module('impactApp').controller('DemandeDocumentsCtrl', function(
  $http, $state, $scope, $modal, toastr, currentUser, currentMdph, UploadService, DemandeService, profile, demande, documentTypes, FileSignatureService) {

  this.$modal = $modal;
  this.user = currentUser;
  this.demande = demande;
  this.mdph = currentMdph;
  this.documentTypes = documentTypes;
  this.selectedDocumentTypes = DemandeService.computeSelectedDocumentTypes(this.demande, documentTypes);

  $scope.$on('file-upload-error', () => toastr.error('Types de documents acceptés : images (jpg, png) et pdf', 'Erreur lors de l\'envoi du document'));

  this.upload = (file, documentType) => {
    FileSignatureService.check(file, ['pdf', 'jpg', 'png'])
      .then(function(result) {
        if (result) {
          UploadService.upload(demande, file, documentType).then(function(resp) {
            demande = resp;
            $state.go('^.documents', {}, {reload: true});
          });
        } else {
          $scope.$emit('file-upload-error', documentType.id);
        }
      });
  };

  this.isMandatory = (documentType) => {
    return (documentType.mandatory || documentType.asked) ? 'mandatory' : '';
  };

  this.isEmpty = (documentType) => {
    const documents = this.getDocuments(documentType);

    return documents.length === 0;
  };

  this.isComplete = (documentType) => {
    return !this.isEmpty(documentType) && !this.isInvalid(documentType);
  };

  this.isInvalid = (documentType) => {
    const documents = this.getDocuments(documentType);

    if (documents.length === 0) {
      return false;
    }

    const rejectedDocuments = _.find(documents, 'isInvalid');
    return typeof rejectedDocuments !== 'undefined';
  };

  this.getDocuments = (currentDoc) => {
    const {obligatoires, complementaires} = this.demande.data.documents;
    const documentId = currentDoc.id;

    if (obligatoires[documentId]) {
      return obligatoires[documentId].documentList;
    } else if (complementaires[documentId]) {
      return complementaires[documentId].documentList;
    } else {
      return [];
    }
  };

  this.createModalComponent = () => {
    const filteredDocumentTypes = _.filter(this.documentTypes, (type) => typeof _.find(this.selectedDocumentTypes, {id: type.id}) === 'undefined');

    return {
      templateUrl: 'app/demande/documents/modal_type.html',
      controller: ['$scope', '$modalInstance', ($scope, $modalInstance) => {
        $scope.filteredDocumentTypes = filteredDocumentTypes;
        $scope.select = (selected) => $modalInstance.close(selected);
        $scope.cancel = () => $modalInstance.dismiss('cancel');
      }]
    };
  };

  this.chooseType = () => {
    const modalComponent = this.createModalComponent();
    const modalInstance = this.$modal.open(modalComponent);

    modalInstance.result.then((selected) => this.selectedDocumentTypes.push(selected));
  };

});
