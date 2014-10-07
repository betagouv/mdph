'use strict';

angular.module('impactApp')
  .controller('FileStateCtrl', function($scope, $state, currentStepName, nextStepName, formSteps, FormService) {

    $scope.formStep = _.find($scope.form.steps, {'name': currentStepName});
    $scope.step = _.find(formSteps, {'id': $scope.formStep.name});

    $scope.files = $scope.formStep.files;

    var checkIfComplete = function() {
      return !_.some($scope.files, {'state': 'telecharge'});
    };
    $scope.isComplete = $scope.formStep.state === 'a_valider' && checkIfComplete();

    var saveFileState = function(file, state) {
      $scope.getSaveFileStateRequest($scope.formStep, file, state).success(function() {
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
        FormService.saveStepState($scope.form, $scope.step, 'erreur');
      } else {
        FormService.saveStepState($scope.form, $scope.step, 'valide', function() {
          FormService.saveNewStep($scope.form, nextStepName, 'en_cours');
        });
      }
    };
  });
