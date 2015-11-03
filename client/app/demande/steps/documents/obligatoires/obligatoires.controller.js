'use strict';

angular.module('impactApp')
  .controller('DocumentsObligatoiresCtrl', function($scope, $modal, $state, UploadService, request, DocumentsService) {
    $scope.request = request;

    $scope.documentTypesById = DocumentsService.documentTypesById;
    $scope.documentsObligatoires = DocumentsService.typesObligatoires;
    $scope.filesVM = DocumentsService.groupByType(request.documents);

    $scope.upload = function(file, documentFile) {
      UploadService.upload(request, $scope.filesVM, file, documentFile);
    };
  });
