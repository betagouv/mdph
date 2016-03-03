'use strict';

angular.module('impactApp')
  .controller('DocumentsObligatoiresCtrl', function($scope, UploadService, request, documentTypes) {
    $scope.request = request;
    $scope.documentTypes = documentTypes;

    $scope.upload = function(file, documentType) {
      UploadService.upload(request, file, documentType);
    };
  });
