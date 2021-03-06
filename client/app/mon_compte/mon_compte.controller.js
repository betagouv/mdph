'use strict';

angular.module('impactApp')
  .controller('MonCompteCtrl', function($state, $scope, User, Auth, currentUser) {
    $scope.errors = {};

    if (currentUser.unconfirmed === true) {
      User.get(currentUser._id).$promise
      .then(function(user) {
        currentUser.unconfirmed = user.unconfirmed;
      });
    }

    $scope.user = currentUser;
    $scope.forms = $state.current.data.forms;

    $scope.changePassword = function(form) {
      $scope.passwordSubmitted = true;
      if (form.$valid) {
        Auth
          .changePassword($scope.user.oldPassword, $scope.user.password)
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
