'use strict';

angular.module('impactApp')
  .controller('PiecesCtrl', function ($scope, $upload, RequestService, step) {
    $scope.currentStep = $scope.steps[step.id];
    $scope.currentFormStep = _.find($scope.currentRequest.steps, {'name': step.name});
    $scope.files = $scope.currentFormStep.files;
    $scope.title = step.name === 'complementaire' ? 'Pièces complementaires' : 'Pièces obligatoires';
    $scope.subtitle = step.name === 'complementaire' ?
      'Suite à notre première analyse de votre demande, nous avons besoin des pièces suivantes avant de pouvoir procéder à l\'évaluation de votre situation.' :
      'Pour compléter votre demande et la transmettre à la Mdph du ' + $scope.currentRequest.mdph.name;

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
          step: step.name,
          name: currentFile.name
        },
        file: file
      }).then(function(res) {
        currentFile.path = res.data;
        checkIfComplete();
      });
    };

    checkIfComplete();
  });
