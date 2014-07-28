'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TravailCtrl
 * @description
 * # TravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TravailCtrl', function ($scope, $sessionStorage) {

    $scope.title = $scope.estRepresentant() ? 'Sa vie au travail' : 'Votre vie au travail';
    
    $scope.currentSection = $sessionStorage.sectionTravail;

    if (angular.isUndefined($scope.$storage.travail)) {
      $scope.$storage.travail = {
        sectionLabel: 'Vie au travail',
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.travail.answers;
  });
