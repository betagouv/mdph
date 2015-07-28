'use strict';

angular.module('impactApp')
  .controller('ResendConfirmationCtrl', function($timeout, $stateParams, $state, $scope, $http) {
    $timeout(function() {
      $http.post('api/users/' + $stateParams.userId + '/resend_confirmation')
      .then(function() {
        $state.go('resend_confirmation_ok');
      })
      .catch(function() {
        $state.go('resend_confirmation_error');
      });
    });
  });
