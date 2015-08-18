'use strict';

angular.module('impactApp')
  .controller('ResetPasswordCtrl', function($stateParams, $scope, $http, $state, $timeout) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.passwordSubmitted = true;
      if (form.$valid) {
        $http.post('api/users/' + $stateParams.userId + '/reset_password/' + $stateParams.newPasswordToken, {newPassword: $scope.password})
        .then(function() {
          $scope.passwordMessage = 'Votre mot de passe a été modifié.';
          $timeout(function() {
            $state.go('login');
          }, 3000);
        })
        .catch(function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.password = 'Ce jeton de modification à déjà été utilisé.';
          $scope.passwordMessage = '';
        });
      }
    };
  });
