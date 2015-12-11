'use strict';

angular.module('impactApp')
  .controller('PartenaireCtrl', function($scope, $location, Partenaire, RequestResource, $state, type) {
    $scope.partenaire = new Partenaire();

    $scope.enterShortId = function(form) {
      if (form.$valid) {
        var shortId = form.shortId.$modelValue;

        $scope.partenaire.$save({shortId: shortId}, function(data) {
          $state.go('partenaire.pj', {shortId: shortId, partenaireId: data._id, type: type});
        });
      }
    };
  });
