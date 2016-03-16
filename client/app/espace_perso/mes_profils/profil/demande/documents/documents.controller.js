'use strict';

angular.module('impactApp')
  .controller('DocumentsCtrl', function($scope, $modal, UploadService, request, documentTypes, currentUser) {
    $scope.request = request;

    $scope.documentTypes = _.filter(documentTypes, {mandatory: true});

    var complDocTypes = _.filter(documentTypes, function(o) {
      return !o.mandatory;
    });

    var askedDocTypes = complDocTypes.filter(function(value) {
      return request.askedDocumentTypes.indexOf(value.id) > -1;
    });

    askedDocTypes.forEach(function(o) {
      o.asked = true;
    });

    $scope.documentTypes = $scope.documentTypes.concat(askedDocTypes);

    var complFilterTypes = _.map(request.documents.complementaires, function(category) {
      return category.documentType;
    });

    complFilterTypes.forEach(function(value) {
      if (typeof _.find(askedDocTypes, {id: value.id}) === 'undefined') {
        $scope.documentTypes.push(value);
      }
    });

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
      if ($scope.request.documents.obligatoires[currentDoc.id]) {
        return $scope.request.documents.obligatoires[currentDoc.id].documentList;
      } else if ($scope.request.documents.complementaires[currentDoc.id]) {
        return $scope.request.documents.complementaires[currentDoc.id].documentList;
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
              return typeof _.find($scope.selectedTypes, {id: type.id}) === 'undefined';
            });

            return filtered;
          }
        }
      });

      modalInstance.result.then(function(selected) {
        $scope.documentTypes.push(selected);
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
