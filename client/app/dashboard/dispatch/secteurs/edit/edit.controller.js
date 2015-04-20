'use strict';

angular.module('impactApp')
  .controller('SecteurEditCtrl', function ($scope, $state, secteur, evaluators, currentMdph) {
    $scope.secteur = secteur;
    $scope.evaluators = evaluators;

    $scope.name = secteur.name;
    $scope.selectedEvaluators = secteur.evaluators ? secteur.evaluators : [];

    $scope.save = function() {
      secteur.evaluators = _.pluck($scope.selectedEvaluators, '_id');
      secteur.name = $scope.name;
      secteur.mdph = currentMdph._id;
      secteur.$save(function() {
        $state.go('^', {}, {reload: true});
      });
    };

    $scope.cancel = function() {
      $state.go('^', {}, {reload: true});
    };

    $scope.delete = function() {
      secteur.$delete(function() {
        $state.go('^', {}, {reload: true});
      });
    };
  });
