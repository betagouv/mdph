'use strict';

angular.module('impactApp')
  .controller('EvaluationLoginCtrl', function($rootScope, $scope, Auth, $location, $state) {
    $scope.user = {};
    $scope.error = null;

    $scope.login = function(form) {
      if (form.$valid) {
        Auth.loginAgent({
          email: form.email.$modelValue,
          password: form.password.$modelValue
        })
        .then(function(user) {
          if (!user.mdph) {
            user.mdph = {zipcode: 'test'};
          }

          return $state.go('evaluation.dashboard', {currentUser: user}, {reload: true});
        })
        .catch(function(err) {
          $scope.error = err.message;
          return $state.go('evaluation.login');
        });
      }
    };
  });
