'use strict';

angular.module('impactApp')
  .controller('SectionCtrl', function($scope, section, sectionModel) {
    $scope.section = section;
    $scope.sectionModel = sectionModel;
  });
