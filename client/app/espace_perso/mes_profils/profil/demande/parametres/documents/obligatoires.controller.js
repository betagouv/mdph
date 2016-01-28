'use strict';

angular.module('impactApp')
  .controller('DocumentsObligatoiresCtrl', function($scope, $state, UploadService, request, documentTypes) {
    $scope.request = request;
    $scope.documentTypes = documentTypes;

    $scope.upload = function(file, documentType) {
      UploadService.upload(request, file, documentType);
    };
  });
