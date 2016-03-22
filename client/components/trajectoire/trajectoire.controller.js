'use strict';

angular.module('impactApp')
  .controller('TrajectoireController', function($scope, ReadModeService) {
    $scope.getReadMode = ReadModeService.getReadMode;

    $scope.filterByMode = function(question) {
      return (!ReadModeService.getReadMode() || question.isSelected);
    };
  });
