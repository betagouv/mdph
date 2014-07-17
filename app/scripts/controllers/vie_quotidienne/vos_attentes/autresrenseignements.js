'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AutresRenseignementsCtrl
 * @description
 * # AutresRenseignementsCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AutresRenseignementsCtrl', function ($scope) {

    $scope.subtitle = 'Autres renseignements que vous souhaiteriez nous communiquer par rapport à votre vie quotidienne';

    if (angular.isUndefined($scope.subSectionModel.autresRenseignements)) {
      $scope.subSectionModel.autresRenseignements = '';
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.section);
    };
  });
