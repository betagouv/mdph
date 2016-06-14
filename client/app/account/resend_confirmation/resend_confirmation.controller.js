'use strict';

angular.module('impactApp')
  .controller('ResendConfirmationCtrl', function($stateParams, $state, $scope, $http, currentMdph) {
    $http.post('api/users/' + $stateParams.userId + '/resend_confirmation', {mdph: currentMdph.zipcode})
      .then(function() {
        $state.go('resend_confirmation_ok');
      })
      .catch(function() {
        $state.go('resend_confirmation_error');
      });
  });
