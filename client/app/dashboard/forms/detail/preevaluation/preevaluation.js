'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.forms.detail.preevaluation', {
        url: '/preevaluation',
        templateUrl: 'app/dashboard/forms/detail/preevaluation/preevaluation.html',
        controller: function($scope, formSteps, FormService) {
          $scope.formStep = _.find($scope.form.steps, {'name': 'preevaluation'});
          $scope.step = _.find(formSteps, {'id': $scope.formStep.name});

          $scope.files = $scope.formStep.files;
          $scope.allFiles = formSteps;

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
            FormService.saveStepStateAndFiles($scope.form, $scope.step, 'valide', $scope.files, function() {
              FormService.saveNewStepAndFiles($scope.form, 'complementaire', 'en_cours', $scope.files);
            });
          };
        }
      });
  });
