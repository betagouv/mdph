'use strict';

angular.module('impactApp')
  .controller('TrajectoireController', function($scope, ReadModeService) {
    $scope.getReadMode = ReadModeService.getReadMode;

    $scope.filterByMode = function(question) {
      return (!ReadModeService.getReadMode() || question.isSelected);
    };

    $scope.toggleSelected = function(question) {
      question.isSelected = !question.isSelected;
      if (!question.isSelected) {
        question.isExpanded = false;
      }
    };

    $scope.toggleCollapse = function(question) {
      question.isExpanded = !question.isExpanded;
      question.isSelected = true;
    };
  });
