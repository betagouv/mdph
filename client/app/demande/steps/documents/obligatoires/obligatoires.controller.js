'use strict';

angular.module('impactApp')
  .controller('DocumentsObligatoiresCtrl', function($scope, $modal, $state, UploadService, request, DocumentsService, documentTypes) {
    $scope.request = request;
    $scope.documentTypes = documentTypes;

    $scope.filesVM = DocumentsService.groupByType(request.documents);

    $scope.upload = function(file, documentFile) {
      UploadService.upload(request, $scope.filesVM, file, documentFile);
    };
  });
