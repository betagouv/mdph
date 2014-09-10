'use strict';

angular.module('impactApp')
  .controller('ModalLoginCtrl', function ($scope, Auth, $location, $http, $state, $modalInstance, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          $modalInstance.dismiss('cancel');
          $http.put('/api/forms/mine', $scope.formAnswers)
          .success(function() {
            $state.go('demande');
          })
          .error(function() {
            $window.alert('Vous avez déjà enregistré un questionnaire sur ce compte. Le questionnaire courant sera perdu.');
          });
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
