'use strict';

angular.module('impactApp')
  .filter('capitalize', function() {
    return function(input) {
      return input.toLowerCase().replace(/\b\w/g, function(word) {
        return word.toUpperCase();
      });
    };
  });
