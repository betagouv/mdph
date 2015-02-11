'use strict';

angular.module('impactApp')
  .controller('RequestListCtrl', function ($scope, user, requests) {
    $scope.requests = requests;
    $scope.user = user;
    $scope.onlyUrgences = false;

    $scope.filtreUrgences = function(value) {
      if ($scope.onlyUrgences) {
        return angular.isDefined(value.formAnswers);
      }
      return true;
    };
  });
