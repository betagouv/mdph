'use strict';

angular.module('impactApp')
  .controller('TypeEmploiCtrl', function($scope, $state, FormService) {
    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ? 'Quel est son type d\'emploi ?' : 'Quel est votre type d\'emploi ?';

    $scope.question = {
      model: 'type',
      answers: [
        {
          label: 'CDI',
          value: 'cdi'
        },
        {
          label: 'CDD',
          value: 'cdd'
        },
        {
          label: 'Interim',
          value: 'interim'
        },
        {
          label: 'Contrat aidé',
          value: 'contrat_aide'
        },
        {
          label: 'Travailleur indépendant',
          value: 'independant'
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel[$scope.question.model]);
    };

    $scope.nextStep = function() {
      if ($scope.sectionModel.type.value === 'independant') {
        $state.go('^.emploi.nom_poste');
      } else {
        $state.go('^.employeur');
      }
    };
  });
