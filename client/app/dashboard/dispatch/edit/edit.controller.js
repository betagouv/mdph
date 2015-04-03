'use strict';

angular.module('impactApp')
  .controller('DispatchRuleEditCtrl', function ($scope, $state, dispatchRule, evaluators, zipcodes) {
    $scope.dipatchRule = dispatchRule;
    $scope.evaluators = evaluators;
    $scope.zipcodes = zipcodes;

    $scope.selectedEvaluators = dispatchRule.evaluators ? dispatchRule.evaluators : [];
    $scope.selectedZipcodes = dispatchRule.zipcodes ? dispatchRule.zipcodes : [];

    $scope.save = function() {
      dispatchRule.zipcodes = $scope.selectedZipcodes;
      dispatchRule.evaluators = _.pluck($scope.selectedEvaluators, '_id');
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
