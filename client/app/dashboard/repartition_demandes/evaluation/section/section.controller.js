'use strict';

angular.module('impactApp')
  .controller('SectionCtrl', function ($scope, $stateParams, GevaService) {
    $scope.currentSection = _.find(GevaService.getSections(), {id: $stateParams.sectionId});
  });
