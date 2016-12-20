'use strict';

angular.module('impactApp')
  .controller('SignupCtrl', function($rootScope, $scope, $state, ProfileResource, Auth) {
    $scope.user = {};
    $scope.inputType = 'password';

    $scope.toggleType = function() {
      if ($scope.inputType === 'password') {
        $scope.inputType = 'text';
      } else {
        $scope.inputType = 'password';
      }
    };

    $scope.resetMongooseError = function(form, field) {
      form[field].$setValidity('mongoose', true);
    };

    $scope.register = function(form) {
      if (form.$valid) {
        Auth.createUser({
          email: form.email.$modelValue,
          password: form.password.$modelValue
        })
        .then(function(data) {
          // Logged in, redirect
          return $state.go('profil.beneficiaire', {profileId: data.profile}, {reload: true});
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
