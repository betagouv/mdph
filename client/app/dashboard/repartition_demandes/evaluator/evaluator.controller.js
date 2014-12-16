'use strict';

angular.module('impactApp')
  .controller('EvaluatorCtrl', function ($scope, user) {
    $scope.user = user;
  });
