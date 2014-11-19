'use strict';

angular.module('impactApp')
  .controller('DetailCtrl', function ($scope, $http, request) {
    $scope.request = request;

    $scope.getSaveFileStateRequest = function(step, file, state) {
      return $http.put(
        '/api/requests/' + $scope.request.shortId + '/document',
        {
          stepName: step.name,
          fileName: file.name,
          state: state
        }
      );
    };
  });
