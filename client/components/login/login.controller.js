'use strict';

angular.module('impactApp')
  .controller('LoginStepCtrl', function($scope, User, Auth, afterLogin) {
    $scope.user = {};
    $scope.errors = {};
    $scope.inputType = 'password';

    $scope.toggleType = function() {
      if ($scope.inputType === 'password') {
        $scope.inputType = 'text';
      } else {
        $scope.inputType = 'password';
      }
    };

    $scope.toggleSignin = function(bool) {
      $scope.signin = bool;
    };

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        })
        .then(function() {
          afterLogin();
        });
      }
    };

    $scope.register = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
          })
          .catch(function(err) {
            $scope.errors.other = err.message;
          })
          .then(function() {
            afterLogin();
          });
        })
        .catch(function(err) {
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
  });
