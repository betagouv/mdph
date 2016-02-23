'use strict';

angular.module('impactApp')
  .controller('PartenairesEditCtrl', function($scope, $state, partenaire) {
    $scope.partenaire = partenaire;

    $scope.update = function() {
      $scope.partenaire.$save(function() {
        $state.go('^', {}, {reload: true});
      });
    };

    $scope.delete = function() {
      $scope.partenaire.$delete(function() {
        $state.go('^', {}, {reload: true});
      });
    };
  });
