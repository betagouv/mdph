'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AutresRenseignementsScolaireCtrl
 * @description
 * # AutresRenseignementsScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AutresRenseignementsScolaireCtrl', function ($scope) {

    $scope.subtitle = 'Autres renseignements concernant la scolarité que vous souhaiteriez nous communiquer';

    $scope.placeholder = '';

    if (angular.isUndefined($scope.subSectionModel.autresRenseignements)) {
      $scope.subSectionModel.autresRenseignements = '';
    }

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSection);
    };
  });
