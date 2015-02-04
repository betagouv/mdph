'use strict';

angular.module('impactApp')
  .controller('MonCompteCtrl', function($scope, User, Auth) {
    $scope.errors = {};
    $scope.user = Auth.getCurrentUser();

    $scope.changePassword = function(form) {
      $scope.passwordSubmitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.passwordMessage = 'Votre mot de passe a été modifié.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.password = 'Mot de passe incorrect';
          $scope.passwordMessage = '';
        });
      }
    };

    $scope.changePersonalInfo = function(form){
      $scope.infoSubmitted = true;
      if(form.$valid){
        Auth.changeName($scope.user.newName)
        .then(function(){
          $scope.infoMessage = 'Votre nom a été modifié.';
        });
      }
    };
  });
