'use strict';

angular.module('impactApp')
  .controller('ResendConfirmationCtrl', function($timeout, $stateParams, $state, $scope, $http, currentMdph) {
    $timeout(function() {
      $http.post('api/users/' + $stateParams.userId + '/resend_confirmation', {mdph: currentMdph.zipcode})
      .then(function() {
        $state.go('resend_confirmation_ok');
      })
      .catch(function() {
        $state.go('resend_confirmation_error');
      });
    });
  });
