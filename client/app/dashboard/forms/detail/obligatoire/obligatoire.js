'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms.detail.obligatoire', {
        url: '/obligatoire',
        templateUrl: 'app/dashboard/forms/detail/obligatoire/obligatoire.html',
        controller: function($scope, FormService) {
          var formStep = _.find($scope.form.steps, {'name': 'obligatoire'});

          $scope.step = $scope.getStep(formStep);
          $scope.files = formStep.files;

          var sendEventIfComplete = function() {
            if (_.some($scope.files, {'state': 'telecharge'})) {
              return;
            }
            if (_.some($scope.files, {'state': 'erreur'})) {
              FormService.saveStepState($scope.form, $scope.step, 'erreur');
            } else {
              FormService.saveStepState($scope.form, $scope.step, 'valide', function() {
                FormService.saveNewStep($scope.form, 'evaluation', 'en_cours');
              });
            }
          };

          var saveFileState = function(file, state) {
            $scope.getSaveFileStateRequest(formStep, file, state).success(function() {
              file.state = state;
            }).finally(function() {
              sendEventIfComplete();
            });
          };

          $scope.saveValid = function(file) {
            saveFileState(file, 'valide');
          };

          $scope.saveError = function(file) {
            saveFileState(file, 'erreur');
          };
        }
      });
  });
