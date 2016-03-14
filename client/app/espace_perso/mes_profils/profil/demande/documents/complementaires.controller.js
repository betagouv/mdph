'use strict';

angular.module('impactApp')
  .controller('DocumentsComplementairesCtrl', function($scope, $modal, UploadService, request, documentTypes, currentUser) {
    $scope.request = request;
    $scope.documentTypes = documentTypes;

    $scope.selectedTypes = documentTypes.filter(function(value) {
      return request.askedDocumentTypes.indexOf(value.id) > -1;
    });

    var complementairesTypes = _.map(request.documents.complementaires, function(category) {
      return category.documentType;
    });

    complementairesTypes.forEach(function(value) {
      if (typeof _.find($scope.selectedTypes, {id: value.id}) === 'undefined') {
        $scope.selectedTypes.push(value);
      }
    })

    $scope.user = currentUser;

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
              return typeof _.find($scope.selectedTypes, {id: type.id}) === 'undefined';
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
