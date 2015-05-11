'use strict';

angular.module('impactApp')
  .controller('ModalLoginCtrl', function ($scope, $state, User, Auth, $modalInstance) {
    $scope.user = {};
    $scope.errors = {};

    $scope.resetMongooseError = function(form, field) {
      form[field].$setValidity('mongoose', true);
    };

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          $modalInstance.close();
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          User.generateTokenForMail({email: $scope.user.email});
          $state.go('envoi_confirmation');
          $modalInstance.close();
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
