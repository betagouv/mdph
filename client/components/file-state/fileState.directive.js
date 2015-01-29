'use strict';

angular.module('impactApp')
  .directive('fileState', function () {
    return {
      scope: {
        request: '=',
        currentStepName: '=',
        nextStepName: '=',
        nextStepStatus: '=',
        nextStatus: '=',
        saveStep: '=',
        notificationMessage: '=',
        notificationState: '='
      },
      templateUrl: 'components/file-state/fileState.html',
      restrict: 'EA',
      controller: function($scope, $http, $state, requestSteps, Partenaire, NotificationService) {
        $scope.requestStep = _.find($scope.request.steps, {'name': $scope.currentStepName});
        $scope.step = _.find(requestSteps, {'id': $scope.requestStep.name});

        $scope.files = $scope.requestStep.files;


        _.forEach($scope.files, function(file){
          if(file.partenaire){
            file.partenaire = Partenaire.get({email: file.partenaire});
          }
        });

        $scope.isComplete = function() {
          return !_.some($scope.files, {'state': 'telecharge'});
        };

        $scope.save = function() {
          if (_.some($scope.files, {'state': 'erreur'})) {
            $scope.requestStep.state = 'erreur';
          } else {
            $scope.requestStep.state = 'valide';
            $scope.request.status = $scope.nextStatus;
            if ($scope.nextStepName) {
              $scope.request.steps.push({name: $scope.nextStepName, state: $scope.nextStepStatus});
            }
          }

          NotificationService.createNotification($scope.request, $scope.notificationState, $scope.notificationMessage);
        };

        $scope.showSave = function() {
          return $scope.files.length !== 0 && $scope.requestStep.state === 'a_valider';
        };

        $scope.disableSave = function() {
          return !$scope.isComplete();
        };
      }
    };
  });
