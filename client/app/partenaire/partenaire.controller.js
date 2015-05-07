'use strict';

angular.module('impactApp')
  .controller('PartenaireCtrl', function ($scope, $location, Partenaire, RequestResource, $state) {
    $scope.shortId = '';
    $scope.errorMsg = '';
    $scope.partenaire = new Partenaire();
    var type = $state.current.data ? $state.current.data.type : null;

    $scope.enterShortId = function(form) {
      if(form.$valid) {
        $scope.partenaire.$save(function(data) {
          RequestResource.getPartenaire({shortId: form.shortId.$modelValue}, function(request) {
            $state.go('partenaire.pj', {shortId: request.shortId, partenaireId: data._id, type: type});
          });
        });
      }
    };
  });
