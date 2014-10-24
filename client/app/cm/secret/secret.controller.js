'use strict';

angular.module('impactApp')
  .controller('CmSecretController', function ($state, $scope, $http) {
    $scope.certificat = {};
    debugger;
    $http.put('/api/certificats/' + $state.params.id, {secret: $state.params.secret})
      .success(function(data) {
        
      })
      .error(function(err) {

      });
  });
