'use strict';

angular.module('impactApp')
  .controller('DetailDemandeCtrl', function ($scope, $http, $state, request, DroitService, prestations, requestSteps, RequestService) {
    $scope.request = request;
    if($scope.request.formAnswers){
      $scope.prestations = DroitService.compute($scope.request.formAnswers, prestations);
    }

    // TODO rendre le find generique
    var initPreevaluationFiles = function() {
      $scope.requestStep = _.find($scope.request.steps, {'name': 'preevaluation'});
      if($scope.requestStep){
        $scope.requestedFiles = $scope.requestStep.files;
        $scope.allFiles = requestSteps;
      }
    };

    $scope.addRequestedFile = function(file) {
      if (_.contains($scope.files, file)) {
        return;
      }
      $scope.requestedFiles.push({name: file, state: 'demande'});
    };

    $scope.removeRequestedFile = function(index) {
      $scope.requestedFiles.splice(index, 1);
    };

    $scope.saveStepAndFiles = function(currentStepId, currentStepState, nextStepId, nextStepState, nextStatus) {
      if (!nextStepId) {
        RequestService.saveStepState($scope.request, currentStepId, currentStepState);
      } else {
        RequestService.saveStepStateAndFiles($scope.request, currentStepId, currentStepState, $scope.requestedFiles, function() {
          RequestService.saveNewStepAndFiles($scope.request, nextStepId, nextStepState, $scope.requestedFiles, nextStatus).then(function(data) {
            $scope.requestStep = data;
          });
        });
      }
    };

    $scope.saveStep = function(currentStepId, currentStepState, nextStepId, nextStepState, nextStatus) {
      if (!nextStepId) {
        RequestService.saveStepState($scope.request, currentStepId, currentStepState);
      } else {
        RequestService.saveStepState($scope.request, currentStepId, currentStepState, function() {
          RequestService.saveNewStep($scope.request, nextStepId, nextStepState, nextStatus).then(function(result) {
            $scope.requestStep = result.data;
            initPreevaluationFiles();
          });
        });
      }
    };

    $scope.goNext = function() {
      $state.go('dashboard.repartition_demandes.detail.evaluation', {shortId: $scope.request.shortId});
    };

    initPreevaluationFiles();
  });
