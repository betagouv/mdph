'use strict';

angular.module('impactApp')
  .controller('DocumentsObligatoiresCtrl', function($scope, UploadService, request, documentTypes, currentUser) {
    $scope.request = request;
    $scope.documentTypes = documentTypes;

    $scope.user = currentUser;

    $scope.upload = function(file, documentType) {
      UploadService.upload(request, file, documentType);
    };
  });
