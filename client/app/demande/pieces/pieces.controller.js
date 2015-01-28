'use strict';

angular.module('impactApp')
  .controller('PiecesCtrl', function ($scope, $upload, RequestService, step, Notification) {
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
      $scope.currentFormStep.state = 'a_valider';
      $scope.currentRequest.$update();
      $scope.$parent.$broadcast('refreshFormStepSection');

      if($scope.currentRequest.evaluator){
        var notification = new Notification();
        notification.userId = $scope.currentRequest.evaluator;
        notification.requestId = $scope.currentRequest.shortId;
        notification.message = step.name === 'complementaire' ? 'Des pièces complémentaires ont été ajoutées à la demande.' : 'Les pièces obligatoires ont été ajoutées à la demande.';
        notification.state = 'dashboard.repartition_demandes.detail';
        notification.$save();
      }

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
        currentFile.state = 'telecharge';
        checkIfComplete();
      });
    };

    checkIfComplete();
  });
