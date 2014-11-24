'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.requests.detail.preevaluation', {
        url: '/preevaluation',
        templateUrl: 'app/dashboard/requests/detail/preevaluation/preevaluation.html',
        controller: function($scope, requestSteps, RequestService) {
          $scope.requestStep = _.find($scope.request.steps, {'name': 'preevaluation'});
          $scope.step = _.find(requestSteps, {'id': $scope.requestStep.name});

          $scope.files = $scope.requestStep.files;
          $scope.allFiles = requestSteps;

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
        }
      });
  });
