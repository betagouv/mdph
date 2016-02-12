'use strict';

angular.module('impactApp')
  .controller('ModalSuccessCtrl', function($scope, $modalInstance, request) {
    $scope.request = request;
    $scope.save = function() {
      // TODO
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
