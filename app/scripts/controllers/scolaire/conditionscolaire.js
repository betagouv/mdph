'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ConditionScolaireCtrl
 * @description
 * # ConditionScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ConditionScolaireCtrl', function($scope, $state) {

    $scope.subtitle = $scope.estRepresentant() ?
      'Est-' + $scope.getPronoun() + ' actuellement scolarisé' + ($scope.estMasculin() ? '' : 'e') + ' ?' :
      'Etes-vous actuellement scolarisé ?';

    $scope.sectionModel = $scope.sectionModel;

    $scope.question = {
      model: 'scolaire',
      'answers': [
        {
          'label': 'Oui',
          'value': true
        },
        {
          'label': 'Non',
          'value': false
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.scolaire.value);
    };

    $scope.nextStep = function() {
      if ($scope.sectionModel.scolaire.value) {
        $state.go('^.type_scolaire');
      } else {
        $state.go('^.raison_non_scolaire');
      }
    };
  });
