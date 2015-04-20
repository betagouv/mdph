'use strict';

angular.module('impactApp')
  .controller('DispatchRuleEditCtrl', function ($scope, $state, dispatchRule, secteurs, zipcodes, currentMdph) {
    $scope.dispatchRule = dispatchRule;
    $scope.secteurs = secteurs;

    $scope.secteurEnfant = dispatchRule.secteurEnfant ? dispatchRule.secteurEnfant._id : null;
    $scope.secteurAdulte = dispatchRule.secteurAdulte ? dispatchRule.secteurAdulte._id : null;
    $scope.commune = dispatchRule.commune ? dispatchRule.commune : {};

    $scope.save = function() {
      dispatchRule.commune = $scope.commune;
      dispatchRule.secteurEnfant = $scope.secteurEnfant;
      dispatchRule.secteurAdulte = $scope.secteurAdulte;
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
