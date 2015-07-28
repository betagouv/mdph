'use strict';

angular.module('impactApp')
  .filter('documentFilter', function(documents) {
    return function(input) {
      var document = _.find(documents, {id: input});
      return document.label;
    };
  });
