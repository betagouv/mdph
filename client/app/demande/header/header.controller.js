'use strict';

angular.module('impactApp')
  .controller('HeaderCtrl', function($scope, $timeout, $cookies) {
    $scope.token = $cookies.get('token');

    $scope.$on('saving', function(event, status) {
      $scope.saving = status;
      if (status === 'success') {
        $timeout(function() {
          $scope.saving = false;
        }, 1500);
      }
    });
  });
