'use strict';

angular.module('impactApp')
  .controller('ConfirmerMailCtrl', function($scope, $state, $interval, $stateParams, $http) {
    $scope.pending = true;
    $http.post('/api/users/' + $stateParams.userId + '/confirmer_mail/' + $stateParams.newMailToken).success(function() {
      $scope.pending = false;
      $interval(function() {
        $state.go('login');
      }, 5000, 1);
    }).error(function() {
      $scope.pending = false;
      $scope.error = true;
    });
  });
