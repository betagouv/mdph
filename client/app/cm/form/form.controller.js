'use strict';

angular.module('impactApp')
  .controller('CmFormController', function ($scope, $location, $anchorScroll) {
    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
    };
  });
