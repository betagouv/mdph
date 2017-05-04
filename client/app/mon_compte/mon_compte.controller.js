'use strict';

angular.module('impactApp')
  .controller('MonCompteCtrl', function($scope, $state, User, Auth, currentUser) {
    $scope.errors = {};
    $scope.user = currentUser;

    $scope.changePassword = function(form) {
      $scope.passwordSubmitted = true;
      if (form.$valid) {
        Auth
          .changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function() {
            $scope.errors.password = '';
            $scope.passwordMessage = 'Votre mot de passe a été modifié.';
          })
          .catch(function() {
            $scope.errors.password = 'Mot de passe incorrect';
            $scope.passwordMessage = '';
            $scope.user.oldPassword = '';
          });
      }
    };
  });
