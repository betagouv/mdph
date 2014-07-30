'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AutresRenseignementsCtrl
 * @description
 * # AutresRenseignementsCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AutresRenseignementsCtrl', function ($scope, $state) {

    $scope.subtitle = 'Autres renseignements que vous souhaiteriez nous communiquer';
    $scope.placeholder = $scope.estRepresentant() ?
      'Renseignements importants, et notamment son(ses) projet(s) dans sa vie de tous les jours' :
      'Renseignements importants, et notamment votre(vos) projet(s) dans votre vie de tous les jours';

    if (angular.isUndefined($scope.sectionModel.autresRenseignements)) {
      $scope.sectionModel.autresRenseignements = '';
    }

    $scope.nextStep = function() {
      $state.go('^.^.objet');
    };
  });
