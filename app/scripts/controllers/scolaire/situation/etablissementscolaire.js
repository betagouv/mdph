'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EtablissementScolaireCtrl
 * @description
 * # EtablissementScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EtablissementScolaireCtrl', function($scope, $state) {

    $scope.subtitle = 'Dans quel(s) établissement(s) ?';

    if (angular.isUndefined($scope.sectionModel.etablissement)) {
      $scope.sectionModel.etablissement = {
        valeur: false,
        etablissements: [
          { 'name': '' }
        ]
      };
    }

    $scope.model = $scope.sectionModel.etablissement;
    $scope.addEtablissement = function() {
      $scope.model.etablissements.push(
        { 'name': '' }
      );
    };

    $scope.isNextStepDisabled = function() {
      for (var i = 0; i < $scope.model.etablissements.length; i++) {
        if ($scope.model.etablissements[i].name !== '') {
          return false;
        }
      }
      return true;
    };

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.vos_attentes.structure');
    };
  });
