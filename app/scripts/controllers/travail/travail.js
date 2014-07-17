'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TravailCtrl
 * @description
 * # TravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TravailCtrl', function ($scope) {
    $scope.title = 'Votre travail';

    $scope.section = 'votre_travail';
    
    if (angular.isUndefined($scope.data.travail)) {
      $scope.data.travail = {
        sectionLabel: 'Votre situation professionnelle',
        answers: {}
      };
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.section);
    };

    $scope.model = $scope.data.travail;
  });
