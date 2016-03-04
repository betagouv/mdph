'use strict';

angular.module('impactApp')
  .filter('age', function() {
    function calculAge(dateNaiss) {
      var ageDiff = Date.now() - Date.parse(dateNaiss);
      var ageDate = new Date(ageDiff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return function(dateNaiss) {
      return calculAge(dateNaiss);
    };
  })
  .controller('PreEvaluationCtrl', function($scope, $http, $window, $cookies, currentUser, currentMdph) {
    $scope.token = $cookies.get('token');
    $scope.currentMdph = currentMdph;
    $scope.currentUser = currentUser;
  });
