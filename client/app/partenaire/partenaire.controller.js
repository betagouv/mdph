'use strict';

angular.module('impactApp')
  .controller('PartenaireCtrl', function($scope, $location, Partenaire, RequestResource, $state) {
    $scope.shortId = '';
    $scope.errorMsg = '';
    $scope.partenaire = new Partenaire();

    var type = $state.current.data ? $state.current.data.type : null;

    $scope.enterShortId = function(form) {
      if (form.$valid) {
        var shortId = form.shortId.$modelValue;

        $scope.partenaire.$save({shortId: shortId}, function(data) {
          $state.go('partenaire.pj', {shortId: shortId, partenaireId: data._id, type: type});
        });
      }
    };
  });
