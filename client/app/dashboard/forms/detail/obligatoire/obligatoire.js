'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms.detail.obligatoire', {
        url: '/obligatoire',
        templateUrl: 'app/dashboard/forms/detail/obligatoire/obligatoire.html',
        controller: function($scope, $state, formSteps, FormService) {

          $scope.formStep = _.find($scope.form.steps, {'name': 'obligatoire'});
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
                FormService.saveNewStep($scope.form, 'preevaluation', 'en_cours');
              });
            }
          };
        }
      });
  });
