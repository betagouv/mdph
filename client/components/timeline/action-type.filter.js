'use strict';

angular.module('impactApp')
  .filter('actionTypeIconFilter', function(actionTypes) {
    return function(input) {
      const action = actionTypes[input.action];
      return action ? action.fa : 'question';
    };
  })
  .filter('actionTypeLabelFilter', function(actionTypes) {
    return function(input) {
      const action = actionTypes[input.action];
      return action ? action.label : 'Action de type inconnue';
    };
  });
