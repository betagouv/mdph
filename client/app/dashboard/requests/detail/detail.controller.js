'use strict';

angular.module('impactApp')
  .controller('DetailCtrl', function ($scope, $http, request, DroitService) {
    $scope.request = request;
    if($scope.request.formAnswers){
      DroitService.compute($scope.request.formAnswers).success(function(result) {
        $scope.prestations = result;
      });
    }
  });
