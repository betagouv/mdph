'use strict';

angular.module('impactApp')
  .controller('DetailCtrl', function ($scope, $http, request, DroitService, prestations) {
    $scope.request = request;
    if($scope.request.formAnswers){
      $scope.prestations = DroitService.compute($scope.request.formAnswers, prestations);
    }
  });
