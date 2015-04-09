'use strict';

angular.module('impactApp')
  .controller('PartenaireCtrl', function ($scope, $location, Partenaire, RequestResource, $state) {
    $scope.shortId = '';
    $scope.errorMsg = '';
    $scope.partenaire = new Partenaire();
    var type = $state.current.data ? $state.current.data.type : null;

    var success = function(request) {
      $state.go('partenaire.pj', {shortId: request.shortId, type: type});
    };

    $scope.enterShortId = function(form) {
      if(form.$valid) {
        $scope.partenaire.$save(function() {
          RequestResource.getPartenaire({shortId: form.shortId.$modelValue}, success);
        });
      }
    };
  });
