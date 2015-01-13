'use strict';

angular.module('impactApp')
  .controller('SectionCtrl', function ($scope, $stateParams, $state, GevaService) {
    $scope.currentSection = _.find(GevaService.getSections(), {id: $stateParams.sectionId});
    $scope.validate = function() {
      GevaService.validate($scope.currentSection);
      $state.go('^');
    };
  });
