'use strict';

angular.module('impactApp')
  .controller('CmEmailController', function ($state, $scope) {
    $scope.email = $state.params.email;
  });
