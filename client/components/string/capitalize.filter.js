'use strict';

angular.module('impactApp')
  .filter('capitalize', function() {
    return function(input) {
      if (!input) {
        return '';
      }

      return input.toLowerCase().replace(/(?:^|[\s'\-])([a-zA-ZÀ-ÖØ-öø-ÿœŒ])/g, function(char) {
        return char.toUpperCase();
      });
    };
  })
  .filter('capitalizeString', function() {
    return function(input) {
      if (!input) {
        return '';
      }

      return input.substring(0, 1).toUpperCase() + input.substring(1);
    };
  });
