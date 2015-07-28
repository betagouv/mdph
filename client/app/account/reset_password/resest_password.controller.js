'use strict';

angular.module('impactApp')
  .controller('ResetPasswordCtrl', function($stateParams, $scope, $http) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.passwordSubmitted = true;
      if (form.$valid) {
        $http.post('api/users/' + $stateParams.userId + '/reset_password/' + $stateParams.newPasswordToken, {newPassword: $scope.password})
        .then(function() {
          $scope.passwordMessage = 'Votre mot de passe a été modifié.';
        })
        .catch(function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.password = 'Mot de passe incorrect';
          $scope.passwordMessage = '';
        });
      }
    };
  });
