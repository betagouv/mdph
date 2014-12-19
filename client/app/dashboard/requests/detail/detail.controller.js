'use strict';

angular.module('impactApp')
  .controller('DetailCtrl', function ($scope, $http, request, DroitService, prestations, requestSteps, RequestService) {
    $scope.request = request;
    if($scope.request.formAnswers){
      $scope.prestations = DroitService.compute($scope.request.formAnswers, prestations);
    }

    $scope.requestStep = _.find($scope.request.steps, {'name': 'preevaluation'});
    if($scope.requestStep){
      $scope.step = _.find(requestSteps, {'id': $scope.requestStep.name});
      $scope.files = $scope.requestStep.files;
      $scope.allFiles = requestSteps;
    }

    $scope.addFile = function(file) {
      if (_.contains($scope.files, file)) {
        return;
      }
      $scope.files.push({name: file, state: 'demande'});
    };

    $scope.removeFile = function(index) {
      $scope.files.splice(index, 1);
    };

    $scope.saveStep = function() {
      RequestService.saveStepStateAndFiles($scope.request, $scope.step, 'valide', $scope.files, function() {
        RequestService.saveNewStepAndFiles($scope.request, 'complementaire', 'en_cours', $scope.files, 'Recevable');
      });
    };
  });
