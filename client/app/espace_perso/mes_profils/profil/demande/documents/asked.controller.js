'use strict';

angular.module('impactApp')
  .controller('AskedDocumentsCtrl', function($scope, UploadService, request, currentUser, documentTypes) {
    $scope.request = request;
    $scope.askedDocumentTypes = _.map(request.documents.asked, function(category) {
      return category.documentType;
    });
    $scope.user = currentUser;

    $scope.upload = function(file, documentType) {
      UploadService.upload(request, file, documentType);
    };
  });
