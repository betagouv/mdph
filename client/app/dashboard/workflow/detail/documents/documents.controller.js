'use strict';

angular.module('impactApp')
  .controller('RequestDocumentsCtrl', function($scope, $modal, toastr, Auth, request, documentTypes, currentUser) {
    $scope.documentTypes = documentTypes;
    $scope.request = request;
    $scope.currentUser = currentUser;
    $scope.token = Auth.getToken();

    function alreadySelected(request, typeId) {
      return _.find(request.data.askedDocumentTypes, function(current) {
        return current === typeId;
      });
    }

    if (!request.data.askedDocumentTypes) {
      request.data.askedDocumentTypes = [];
    }

    $scope.showLabel = function(type) {
      return _.find($scope.documentTypes, {id: type}).label;
    };

    $scope.addSelectedType = function(type) {
      if (!alreadySelected($scope.request, type.id)) {
        $scope.request.data.askedDocumentTypes.push(type.id);
        $scope.request.$save();
      }
    };

    $scope.removeSelectedType = function(idx) {
      $scope.request.data.askedDocumentTypes.splice(idx, 1);
      $scope.request.$save();
    };

    this.allRequiredFilesCheckedOpenModal = function() {
      let allRequiredFilesChecked = true;
      angular.forEach(request.data.documents.obligatoires, function(value, category) {
        if (category !== undefined && value.documentList[0].isInvalid === undefined) {
          allRequiredFilesChecked = false;
          return;
        }
      });

      if (allRequiredFilesChecked) {

        let request = $scope.request;
        let token = $scope.token;
        $modal.open({
          templateUrl: 'app/dashboard/workflow/detail/documents/modal.html',
          controllerAs: 'modalRdc',
          size: 'lg',
          controller($modalInstance, $state, DemandeService) {
            this.src = `/api/requests/${request.shortId}/generate-reception-mail?access_token=${token}`;

            this.ok = function() {
              DemandeService.postAction(request, {
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
      } else {
        toastr.error('Vous n\'avez pas statué sur tous les documents obligatoires joints par l\'usager');
      }
    };

  });
