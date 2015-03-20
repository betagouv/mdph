'use strict';

angular.module('impactApp')
  .controller('PartenaireCtrl', function ($scope, $location, RequestResource, $state) {
    $scope.shortId = '';
    $scope.errorMsg = '';
    $scope.partenaire = {};

    var success = function(request) {
      $state.go('partenaire.pj', {shortId: request.shortId});
    };

    $scope.enterShortId = function(form) {
      if(form.$valid) {
        RequestResource.getPartenaire({shortId: form.shortId.$modelValue}, success);
      }
    };
  });
