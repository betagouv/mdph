'use strict';

angular.module('impactApp')
  .controller('SecteurEditCtrl', function($scope, $state, secteur, evaluators, currentMdph) {
    $scope.secteur = secteur;
    $scope.name = secteur.name;
    $scope.evaluators = evaluators;
    $scope.default = secteur.default;

    $scope.selectedEvaluatorsAdultes = secteur.evaluators && secteur.evaluators.adulte ? secteur.evaluators.adulte : [];
    $scope.selectedEvaluatorsEnfants = secteur.evaluators && secteur.evaluators.enfant ? secteur.evaluators.enfant : [];

    $scope.save = function() {
      secteur.evaluators = {
        adulte: _.pluck($scope.selectedEvaluatorsAdultes, '_id'),
        enfant: _.pluck($scope.selectedEvaluatorsEnfants, '_id'),
      };

      secteur.name = $scope.name;
      secteur.default = $scope.default;
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
