'use strict';

angular.module('impactApp')
  .controller('SecteurEditCtrl', function($scope, $state, secteur, evaluators, currentMdph) {
    $scope.secteur = secteur;
    $scope.name = secteur.name;
    $scope.evaluators = evaluators;
    $scope.default = secteur.default;

    $scope.selectedEvaluatorsAdultes = secteur.evaluators && secteur.evaluators.adulte ? secteur.evaluators.adulte : [];
    $scope.selectedEvaluatorsEnfants = secteur.evaluators && secteur.evaluators.enfant ? secteur.evaluators.enfant : [];

    $scope.toggleSelection = function(selection, evaluatorId) {
      var idx = selection.indexOf(evaluatorId);

      if (idx > -1) {
        selection.splice(idx, 1);
      } else {
        selection.push(evaluatorId);
      }
    };

    $scope.save = function() {
      secteur.evaluators = {
        adulte: $scope.selectedEvaluatorsAdultes,
        enfant: $scope.selectedEvaluatorsEnfants
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
  });
