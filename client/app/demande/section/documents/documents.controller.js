
'use strict';

angular.module('impactApp')
  .controller('DocumentsCtrl', function($scope, $modal, $state, $upload, section, request, documentTypes) {
    $scope.section = section;
    $scope.request = request;
    $scope.documentTypesById = _.indexBy(documentTypes, 'id');

    $scope.onFileSelect = function(file, document) {
      $upload.upload({
        url: 'api/requests/' + $scope.request.shortId + '/document',
        withCredentials: true,
        data: {
          'type': document.type,
          'state': 'telecharge'
        },
        file: file
      }).success(function(data) {
        document.files.push(data);
      });
    };

    $scope.chooseType = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/demande/section/documents/modal_type.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          documents: function () {
            var filtered = [];
            var requested = _.pluck(request.documents, 'id');

            documentTypes.forEach(function(type) {
              if (requested.indexOf(type.id) < 0) {
                filtered.push(type);
              }
            });

            return filtered;
          }
        }
      });

      modalInstance.result.then(function (selected) {
        request.documents.push({id: selected});
      });
    };
  })
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, documents) {
    $scope.documents = documents;

    $scope.select = function(selected) {
      $modalInstance.close(selected.id);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
