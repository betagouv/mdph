'use strict';

angular.module('impactApp')
  .controller('SectionCtrl', function ($scope, $stateParams, $state, GevaService) {
    $scope.currentSection = _.find($scope.sections, {id: $stateParams.sectionId});

    $scope.validate = function() {
      GevaService.validate($scope.currentSection);
      $state.go('^');
    };
  });
