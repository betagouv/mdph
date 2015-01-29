'use strict';

angular.module('impactApp')
  .controller('CmFormController', function ($state, $scope, $http) {
    $scope.certificat = {};
    $scope.requestId = $state.params.id || '';

    $scope.submit = function() {
      $http.post('/api/certificats/' + $scope.requestId, $scope.certificat)
        .success(function() {
          $state.go('cm_email', {email: $scope.certificat.coordonnees.email});
        })
        .error(function() {

        });
    };
  });
