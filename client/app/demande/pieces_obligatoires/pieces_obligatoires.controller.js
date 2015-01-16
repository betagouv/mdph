'use strict';

angular.module('impactApp')
  .controller('PiecesObligatoiresCtrl', function ($scope, $upload, RequestService) {
    $scope.currentStep = $scope.steps[1];
    $scope.currentFormStep = _.find($scope.currentRequest.steps, {'name': $scope.currentStep.id});

    $scope.files = $scope.currentFormStep.files;

    var checkIfComplete = function() {
      $scope.complete = _.every($scope.files, 'path');
    };

    $scope.validateStep = function() {
      RequestService.saveStepState($scope.currentRequest, $scope.currentStep.id, 'a_valider', function() {
        $scope.$parent.$broadcast('refreshFormStepSection');
      });
    };

    $scope.onFileSelect = function($files, currentFile) {
      //$files: an array of files selected, each file has name, size, and type.
      var file = $files[0];
      $upload.upload({
        url: 'api/requests/' + $scope.currentRequest.shortId + '/document',
        withCredentials: true,
        data: {
          step: 'obligatoire',
          name: currentFile.name
        },
        file: file
      }).then(function(res) {
        currentFile.path = res.data;
        checkIfComplete();
      });
    };

  });
