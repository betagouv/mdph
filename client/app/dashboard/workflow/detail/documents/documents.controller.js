'use strict';

(function() {
  function alreadySelected(request, typeId) {
    return _.find(request.askedDocumentTypes, function(current) {
      return current === typeId;
    });
  }

  class RequestDocumentsCtrl {
    constructor($modal, Auth, request, documentTypes, currentUser) {
      this.documentTypes = documentTypes;
      this.request = request;
      this.currentUser = currentUser;
      this.$modal = $modal;
      this.token = Auth.getToken();

      if (!request.askedDocumentTypes) {
        request.askedDocumentTypes = [];
      }
    }

    showLabel(type) {
      return _.find(this.documentTypes, {id: type}).label;
    }

    addSelectedType(type) {
      if (!alreadySelected(this.request, type.id)) {
        this.request.askedDocumentTypes.push(type.id);
        this.request.$save();
      }
    }

    removeSelectedType(idx) {
      this.request.askedDocumentTypes.splice(idx, 1);
      this.request.$save();
    }

    openModal() {
      let request = this.request;
      let token = this.token;

      this.$modal.open({
        templateUrl: 'app/dashboard/workflow/detail/documents/modal.html',
        controllerAs: 'modalRdc',
        size: 'lg',
        controller($modalInstance, $state, RequestService) {
          this.src = `/api/requests/${request.shortId}/generate-reception-mail?access_token=${token}`;

          this.ok = function() {
            RequestService.postAction(request, {
              id: 'enregistrement'
            }).then(() => {
              $modalInstance.close();
              $state.go('.', {}, {reload: true});
            });
          };

          this.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        }
      });
    }
  }

  angular.module('impactApp')
    .controller('RequestDocumentsCtrl', RequestDocumentsCtrl);
})();
