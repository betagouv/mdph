'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AidantCtrl
 * @description
 * # AidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AidantCtrl', function ($scope, $sessionStorage) {

    $scope.currentSection = $sessionStorage.sectionAidant;
    $scope.title = 'Cette partie s\'adresse  à(aux) l\'aidant(s) de la personne en situation de handicap';

    if (angular.isUndefined($scope.$storage.aidant)) {
      $scope.$storage.aidant = {
        sectionLabel: $scope.currentSection.label,
        answers: {}
      };
    }

    $scope.sectionModel = $scope.$storage.aidant.answers;
  });
