'use strict';

angular.module('impactApp')
  .controller('DocumentsComplementairesCtrl', function($scope, $modal, $state, UploadService, request, documentTypes) {
    $scope.request = request;

    $scope.documentTypesById = _.indexBy(documentTypes, 'id');
    $scope.filesVM = _.groupBy(request.documents, 'type');

    // Initialisation documents complementaires
    $scope.documentsComplementaires = _.chain(documentTypes)
      .reject({mandatory: true})
      .filter(function(type) {
        return typeof $scope.filesVM[type.id] !== 'undefined';
      })
      .value();

    $scope.upload = function(file, documentFile) {
      UploadService.upload(request, $scope.filesVM, file, documentFile);
    };

    $scope.chooseType = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/demande/steps/documents/modal_type.html',
        controller: 'ChooseTypeModalInstanceCtrl',
        resolve: {
          categories: function () {
            var filtered = _.chain(documentTypes)
              .reject({mandatory: true})
              .filter(function(type) {
                return typeof _.find($scope.documentsComplementaires, {id: type.id}) === 'undefined';
              })
              .value();

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
      $modalInstance.close(selected);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
