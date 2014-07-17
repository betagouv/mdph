'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:BesoinsCtrl
 * @description
 * # BesoinsCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('BesoinsCtrl', function ($scope) {
    $scope.title = 'Vos besoins dans la vie quotidienne';
    
    if (angular.isUndefined($scope.sectionModel.besoins)) {
      $scope.sectionModel.besoins = {
        label: 'Vos besoins dans la vie quotidienne',
        answers: {}
      };
    }

    $scope.subSectionModel = $scope.sectionModel.besoins.answers;
  });
