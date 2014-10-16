'use strict';

angular.module('impactApp')
  .controller('CmIdentificationCtrl', function ($scope, $stateParams) {
    $scope.id = $stateParams.id;
  });
