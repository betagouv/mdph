'use strict';

angular.module('impactApp')
  .controller('BeneficiairesEditCtrl', function($scope, $state, user) {
    $scope.user = user;

    $scope.update = function() {
      $scope.user.$changeInfo(function() {
        $state.go('^', {}, {reload: true});
      });
    };
  });
