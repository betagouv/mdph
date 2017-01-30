'use strict';

angular.module('impactApp')
  .controller('SectionCtrl', function($scope, section, sectionModel, previousModel) {
    $scope.section = section;
    $scope.sectionModel = sectionModel;
    $scope.previousModel = previousModel;
  });
