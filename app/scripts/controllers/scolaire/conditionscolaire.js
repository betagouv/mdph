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

    $scope.question = {
      'answers': [
        {
          'label': 'Oui',
          'value': true
        },
        {
          'label': 'Non',
          'value': false
        }
      ],
      radioModel: ($scope.sectionModel.scolaire) ? $scope.sectionModel.scolaire.value : '',
      setAnswer: function(answer) {
        $scope.sectionModel.scolaire = answer;
      }
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.scolaire);
    };

    $scope.nextStep = function() {
      if ($scope.question.radioModel) {
        $state.go('^.type_scolaire');
      } else {
        $state.go('^.raison_non_scolaire');
      }
    };
  });
