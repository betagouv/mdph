'use strict';

angular.module('impactApp')
  .controller('DocumentsComplementairesCtrl', function($scope, $modal, $state, UploadService, request, documentTypes) {
    $scope.request = request;

    $scope.documentTypesById = _.indexBy(documentTypes, 'id');
    $scope.filesVM = _.groupBy(request.documents, 'type');

    // Initialisation documents complementaires
    var typesComplementaires = _.reject(documentTypes, {mandatory: true});
    $scope.documentsComplementaires = [];
    typesComplementaires.forEach(function(type) {
      if ($scope.filesVM[type.id]) {
        $scope.documentsComplementaires.push(type.id);
      }
    });

    $scope.upload = function(file, documentFile) {
      UploadService.upload(request, $scope.filesVM, file, documentFile);
    };

    $scope.chooseType = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/demande/steps/documents/modal_type.html',
        controller: 'ChooseTypeModalInstanceCtrl',
        resolve: {
          categories: function () {
            var filtered = [];
            var requested = $scope.documentsComplementaires;

            documentTypes.forEach(function(type) {
              if (requested.indexOf(type.id) < 0 || type.mandatory !== true || type.category !== 'autre') {
                filtered.push(type);
              }
            });

            var categories = _.groupBy(filtered, 'category');
            return categories;
          }
        }
      });

      modalInstance.result.then(function (selected) {
        $scope.documentsComplementaires.push(selected);
      });
    };
  })
  .controller('ChooseTypeModalInstanceCtrl', function ($scope, $modalInstance, categories) {
    $scope.categories = categories;

    $scope.select = function(selected) {
      $modalInstance.close(selected.id);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
