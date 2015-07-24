'use strict';

angular.module('impactApp')
  .controller('DocumentsObligatoiresCtrl', function($scope, $modal, $state, UploadService, request, documentTypes) {
    $scope.request = request;

    $scope.documentTypesById = _.indexBy(documentTypes, 'id');
    $scope.filesVM = _.groupBy(request.documents, 'type');

    // Initialisation documents obligatoires
    $scope.documentsObligatoires = _.chain(documentTypes)
      .filter({mandatory: true})
      .pluck('id')
      .value();

    $scope.upload = function(file, documentFile) {
      UploadService.upload(request, $scope.filesVM, file, documentFile);
    };
  });
