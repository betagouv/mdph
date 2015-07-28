'use strict';

angular.module('impactApp')
  .controller('ConfirmerMailCtrl', function($scope, $state, $timeout, $stateParams, $http) {
    $scope.pending = true;
    $http.post('/api/users/' + $stateParams.userId + '/confirmer_mail/' + $stateParams.newMailToken).success(function() {
      $scope.pending = false;
      $timeout(function() {
        $state.go('login');
      }, 5000);
    }).error(function() {
      $scope.pending = false;
      $scope.error = true;
    });
  });
