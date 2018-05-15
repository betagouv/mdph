'use strict';

angular.module('impactApp')
  .controller('SignupCtrl', function($rootScope, $scope, $state, ProfileResource, Auth, currentMdph) {
    $scope.user = {};
    $scope.forms = $state.current.data.forms;
    $scope.inputType = 'password';
    $scope.show = false;
    $scope.startTime =  $scope.startTime ? $scope.startTime : new Date().getTime();

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
      let delaisMin = 1000;
      if (form.contact.$modelValue === '' && form.emailSecours.$modelValue === 'your@email.com') {
        if ((new Date().getTime() - $scope.startTime) >  delaisMin) {
          if (form.$valid) {
            Auth.createUser({
              email: form.email.$modelValue,
              password: form.password.$modelValue,
              mdph: currentMdph.zipcode
            })
            .then(function(data) {
              // Logged in, redirect
              return $state.go('demande.beneficiaire', {profileId: data.profile}, {reload: true});
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
        }  else {
          form.emailSecours.$setValidity('formulaire', false);
        }
      } else {
        form.contact.$setValidity('formulaire', false);
      }
    };
  });
