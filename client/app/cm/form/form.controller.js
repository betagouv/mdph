'use strict';

angular.module('impactApp')
  .controller('CmFormController', function ($state, $scope, $http) {
    $scope.certificat = {};

    $scope.submit = function() {
      $http.post('/api/certificats/' + $state.params.id, $scope.certificat)
        .success(function(data) {
          
        })
        .error(function(err) {

        });
    };
  });
