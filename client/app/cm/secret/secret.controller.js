'use strict';

angular.module('impactApp')
  .controller('CmSecretController', function ($state, $scope, $http) {
    $scope.certificat = {};
    $scope.requestId = $state.params.id;
    $http.put('/api/certificats/' + $scope.requestId, {secret: $state.params.secret})
      .success(function(data) {
        
      })
      .error(function(err) {

      });
  });
