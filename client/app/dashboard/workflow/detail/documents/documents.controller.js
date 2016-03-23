'use strict';

(function() {
  function alreadySelected(request, typeId) {
    return _.find(request.askedDocumentTypes, function(current) {
      return current === typeId;
    });
  }

  class RequestDocumentsCtrl {
    constructor($state, $modal, Auth, request, documentTypes, currentUser) {
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

      this.modalInstance = this.$modal.open({
        templateUrl: 'app/dashboard/workflow/detail/documents/modal.html',
        controllerAs: 'modalRdc',
        size: 'lg',
        controller($modalInstance) {
          this.$modalInstance = this.$modalInstance;
          this.src = `/api/requests/${request.shortId}/generate-reception-mail?access_token=${token}`;

          this.select = function() {
            this.$modalInstance.close();
          };

          this.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        }
      });

      this.modalInstance.result.then(function() {

      });
    }
  }

  angular.module('impactApp')
    .controller('RequestDocumentsCtrl', RequestDocumentsCtrl);
})();

// angular.module('impactApp')
//   .controller('RequestDocumentsCtrl', function($scope) {
//     $scope.documentTypes = documentTypes;
//     $scope.selected = null;
//
//     if (!request.askedDocumentTypes) {
//       request.askedDocumentTypes = [];
//     }
//
//     $scope.showLabel = function(type) {
//       return _.find(documentTypes, {id: type}).label;
//     };
//
//     $scope.addSelectedType = function(type) {
//       if (!alreadySelected(type.id)) {
//         request.askedDocumentTypes.push(type.id);
//         request.$save();
//       }
//     };
//
//     $scope.removeSelectedType = function(idx) {
//       request.askedDocumentTypes.splice(idx, 1);
//       request.$save();
//     };
//
//     $scope.preview = function() {
//
//     };
//
//     $scope.chooseType = function() {
//       var modalInstance = $modal.open({
//         templateUrl: 'app/espace_perso/mes_profils/profil/demande/documents/modal_type.html',
//         controller: 'ChooseTypeModalInstanceCtrl',
//         resolve: {
//           generated: function() {
//             return RequestService.generateReceptionMail(request).then(response => {
//               $scope.generated = $sce.trustAsHtml(response.data);
//             });
//           }
//         }
//       });
//
//       modalInstance.result.then(function(selected) {
//         $scope.selectedTypes.push(selected);
//       });
//     };
//
//     $scope.save = function(isSuccess) {
//       return RequestService.postAction(request, {
//         id: isSuccess ? 'succes_enregistrement' : 'erreur_enregistrement',
//         shortId: request.shortId,
//         comments: request.comments,
//         numeroDossier: request.numeroDossier,
//         refusedDocuments: RequestService.findRefusedDocuments(request),
//         askedDocumentTypes: RequestService.getAskedDocumentTypes(request)
//       }).then(() => {
//         $state.go('.', {}, {reload: true});
//       });
//     };
//   })
//   .controller('ChooseTypeModalInstanceCtrl', function($scope, $modalInstance, filteredDocumentTypes) {
//     $scope.filteredDocumentTypes = filteredDocumentTypes;
//
//     $scope.select = function(selected) {
//       $modalInstance.close(selected);
//     };
//
//     $scope.cancel = function() {
//       $modalInstance.dismiss('cancel');
//     };
//   });
