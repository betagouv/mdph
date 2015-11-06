'use strict';

angular.module('impactApp')
  .filter('documentFilter', function(documentTypes) {
    return function(input) {
      var document = _.find(documentTypes, {id: input});
      return document.label;
    };
  });
