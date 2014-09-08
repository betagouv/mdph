'use strict';

angular.module('impactApp')
  .controller('ConditionScolaireCtrl', function($scope, $state, FormService) {

    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ?
      'Est-' + FormService.getPronoun($scope.formAnswers) + ' actuellement scolarisé' + (FormService.estMasculin($scope.formAnswers) ? '' : 'e') + ' ?' :
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
      return angular.isUndefined($scope.sectionModel.scolaire);
    };

    $scope.nextStep = function() {
      if ($scope.sectionModel.scolaire.value) {
        $state.go('^.type_scolaire');
      } else {
        $state.go('^.raison_non_scolaire');
      }
    };
  });
