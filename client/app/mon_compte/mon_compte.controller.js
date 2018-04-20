'use strict';

angular.module('impactApp')
  .controller('MonCompteCtrl', function($scope, $state, User, Auth, currentUser) {
    $scope.errors = {};

    if (currentUser.unconfirmed === true) {
      var configNoCache = {
        headers: {common: {'Cache-Control': 'no-cache'}}
      };

      User.get(currentUser._id, configNoCache).$promise
      .then(function(user) {
        currentUser.unconfirmed = user.unconfirmed;
      });
    }

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
