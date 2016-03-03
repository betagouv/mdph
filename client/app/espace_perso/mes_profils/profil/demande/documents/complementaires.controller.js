'use strict';

angular.module('impactApp')
  .controller('DocumentsComplementairesCtrl', function($scope, $modal, UploadService, request, documentTypes) {
    $scope.request = request;
    $scope.documentTypes = documentTypes;
    $scope.selectedTypes = _.map(request.documents.complementaires, function(category) {
      return category.documentType;
    });

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
              return typeof _.find($scope.request.documents.complementaires, {documentType: {id: type.id}}) === 'undefined';
            });

            return filtered;
          }
        }
      });

      modalInstance.result.then(function(selected) {
        $scope.selectedTypes.push(selected);
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
