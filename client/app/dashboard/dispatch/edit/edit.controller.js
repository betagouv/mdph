'use strict';

angular.module('impactApp')
  .controller('DispatchRuleEditCtrl', function ($scope, $state, dispatchRule, evaluators, zipcodes) {
    $scope.dispatchRule = dispatchRule;
    $scope.evaluators = evaluators;
    $scope.zipcodes = zipcodes;

    $scope.selectedEvaluator = dispatchRule.evaluator ? dispatchRule.evaluator._id : null;
    $scope.selectedZipcodes = dispatchRule.zipcodes ? dispatchRule.zipcodes : [];

    $scope.save = function() {
      dispatchRule.zipcodes = $scope.selectedZipcodes;
      dispatchRule.evaluator = $scope.selectedEvaluator;
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
