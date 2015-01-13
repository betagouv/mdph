'use strict';

angular.module('impactApp')
  .controller('PiecesComplementairesCtrl', function ($scope, RequestService, $http) {

    $scope.currentStep = $scope.steps[3];
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
      $http.post('api/requests/' + $scope.request.shortId + '/document', {
        stepName: $scope.currentStep.id,
        documentName: currentFile.name,
        file: file.name,
        uploaderType: 'Demandeur',
      }).then(function(res) {
        currentFile.path = res.data;
        checkIfComplete();
      });
    };

  });
