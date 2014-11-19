'use strict';

angular.module('impactApp')
  .controller('PartenaireCtrl', function ($scope, $location, RequestResource, $state) {
    $scope.shortId = '';
    $scope.errors = {};

    var success = function(request) {
      $scope.request = request;
      $state.go('partenaire.pj', {shortId: $scope.shortId});
    };

    var error = function(err) {
      // TODO
      console.log(err);
    };

    $scope.enterShortId = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        RequestResource.get({shortId: $scope.shortId}, success, error);
      }
    };
  });
