'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AutresRenseignementsAidantCtrl
 * @description
 * # AutresRenseignementsAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AutresRenseignementsAidantCtrl', function ($scope) {

    $scope.subtitle = 'Autres renseignements que vous souhaiteriez nous communiquer concernant votre vie d\'aidant';

    if (angular.isUndefined($scope.sectionModel.autresRenseignements)) {
      $scope.sectionModel.autresRenseignements = '';
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSection);
    };
  });
