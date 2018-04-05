'use strict';

angular.module('impactApp')
  .directive('mdphPhoto', function() {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attr) {
          element.attr('style', 'background-image : url(/api/mdphs/' + attr.mdphPhoto + '/photo/)');
        }
      };
  });
