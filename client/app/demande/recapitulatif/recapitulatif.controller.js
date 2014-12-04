'use strict';

angular.module('impactApp')
  .controller('RecapitulatifCtrl', function ($scope, Auth, currentRequest, $sessionStorage) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.currentRequest = currentRequest;
    $sessionStorage.formAnswers = currentRequest.formAnswers;
  });
