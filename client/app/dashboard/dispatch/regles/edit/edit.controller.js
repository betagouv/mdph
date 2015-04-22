'use strict';

angular.module('impactApp')
  .controller('DispatchRuleEditCtrl', function ($scope, $state, dispatchRule, secteurs, zipcodes, currentMdph) {
    $scope.dispatchRule = dispatchRule;
    $scope.secteurs = secteurs;

    $scope.secteurEnfant = dispatchRule.secteur && dispatchRule.secteur.enfant ? dispatchRule.secteur.enfant._id : null;
    $scope.secteurAdulte = dispatchRule.secteur && dispatchRule.secteur.adulte ? dispatchRule.secteur.adulte._id : null;
    $scope.commune = dispatchRule.commune ? dispatchRule.commune : {};

    $scope.save = function() {
      dispatchRule.commune = $scope.commune;
      dispatchRule.secteur = {
        adulte: $scope.secteurAdulte,
        enfant: $scope.secteurEnfant,
      };
      dispatchRule.mdph = currentMdph._id;
      dispatchRule.$save(function() {
        $state.go('^', {}, {reload: true});
      });
    };

    $scope.cancel = function() {
      $state.go('^', {}, {reload: true});
    };

    $scope.delete = function() {
      dispatchRule.$delete(function() {
        $state.go('^', {}, {reload: true});
      });
    };
  });
