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

    $scope.nextStep = function() {
      $state.go('^.vos_attentes.structure');
    };
  });
