'use strict';

angular.module('impactApp')
  .controller('MonCompteCtrl', function($scope, Auth, currentUser) {
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
            $scope.errors.password = 'Le mot de passe actuel n\'est pas correct';
            $scope.passwordMessage = '';
            $scope.user.oldPassword = '';
          });
      }
    };
  });
