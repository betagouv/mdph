'use strict';

angular.module('impactApp')
  .controller('AdminCtrl', function($scope, MdphResource) {
    $scope.mdphs = MdphResource.query();
  });
