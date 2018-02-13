'use strict';

angular.module('impactApp')
  .controller('ConfirmerMailCtrl', function($scope, $state, $interval, $stateParams, $http, currentUser) {
    $scope.pending = true;
    $http.post('/api/users/' + $stateParams.userId + '/confirmer_mail/' + $stateParams.newMailToken).then(function() {
      $scope.pending = false;
      currentUser.unconfirmed = false;
    }).catch(function() {
      $scope.pending = false;
      $scope.error = true;
    });
  });
