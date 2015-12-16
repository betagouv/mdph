'use strict';

angular.module('impactApp')
  .controller('DocumentsObligatoiresCtrl', function($scope, $modal, $state, UploadService, request, documentTypes) {
    $scope.request = request;
    $scope.documentTypes = documentTypes;
    $scope.filesVM = _.groupBy(request.documents, 'type');

    $scope.upload = function(file, documentFile) {
      UploadService.upload(request, $scope.filesVM, file, documentFile);
    };
  });
