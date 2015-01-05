'use strict';

angular.module('impactApp')
  .directive('fileState', function () {
    return {
      scope: {
        request: '=',
        currentStepName: '=',
        nextStepName: '=',
        nextStatus: '=',
        saveStep: '='
      },
      templateUrl: 'components/file-state/fileState.html',
      restrict: 'EA',
      controller: function($scope, $http, $state, requestSteps) {
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

        $scope.save = function() {
          if (_.some($scope.files, {'state': 'erreur'})) {
            $scope.saveStep($scope.currentStepName, 'erreur');
          } else {
            $scope.saveStep($scope.currentStepName, 'valide', $scope.nextStepName, 'en_cours', $scope.nextStatus);
          }
        };
      }
    };
  });
