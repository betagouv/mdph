'use strict';

angular.module('impactApp')
  .controller('EspacePersoCtrl', function ($scope, SectionFrontConstants) {
    $scope.sections = SectionFrontConstants;
  });
