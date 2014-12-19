'use strict';

angular.module('impactApp')
  .directive('fileState', function () {
    return {
      scope: {
        request: '=',
        currentStepName: '=',
        nextStepName: '=',
        nextStatus: '='
      },
      templateUrl: 'components/file-state/fileState.html',
      restrict: 'EA',
      controller: function($scope, $http, $state, requestSteps, RequestService) {
        $scope.requestStep = _.find($scope.request.steps, {'name': $scope.currentStepName});
        $scope.step = _.find(requestSteps, {'id': $scope.requestStep.name});

        $scope.files = $scope.requestStep.files;

        var checkIfComplete = function() {
          return !_.some($scope.files, {'state': 'telecharge'});
        };
        $scope.isComplete = $scope.requestStep.state === 'a_valider' && checkIfComplete();
        var getSaveFileStateRequest = function(step, file, state) {
          return $http.put(
            '/api/requests/' + $scope.request.shortId + '/document',
            {
              stepName: step.name,
              fileName: file.name,
              state: state
            }
          );
        };

        var saveFileState = function(file, state) {
          getSaveFileStateRequest($scope.requestStep, file, state).success(function() {
            file.state = state;
          }).finally(function() {
            $scope.isComplete = checkIfComplete();
          });
        };

        $scope.saveValid = function(file) {
          saveFileState(file, 'valide');
        };

        $scope.saveError = function(file) {
          saveFileState(file, 'erreur');
        };

        $scope.saveStep = function() {
          if (_.some($scope.files, {'state': 'erreur'})) {
            RequestService.saveStepState($scope.request, $scope.step, 'erreur');
          } else {
            RequestService.saveStepState($scope.request, $scope.step, 'valide', function() {
              RequestService.saveNewStep($scope.request, $scope.nextStepName, 'en_cours', $scope.nextStatus);
            });
          }
        };
      }
    };
  });
