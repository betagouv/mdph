'use strict';

angular.module('impactApp')
  .controller('PartenaireCtrl', function ($scope, $location, RequestResource, $state) {
    $scope.shortId = '';
    $scope.errorMsg = '';

    var success = function(request) {
      $state.go('partenaire.pj', {shortId: request.shortId});
    };

    var error = function() {
      $scope.errorMsg = 'Code client incorrect';
    };

    $scope.enterShortId = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        RequestResource.getPartenaire({shortId: form.shortId.$modelValue}, success, error);
      }
    };
  });
