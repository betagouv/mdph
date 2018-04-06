'use strict';

angular.module('impactApp')
  .controller('DemandeSectionCtrl', function($scope, section, sectionModel, previousModel) {
    $scope.section = section;
    $scope.sectionModel = sectionModel;
    $scope.previousModel = previousModel;
  });
