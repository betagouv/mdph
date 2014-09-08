'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:MilieuCtrl
 * @description
 * # MilieuCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('MilieuCtrl', function($scope, $state, FormService) {
    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ?
      'Où est-' + FormService.getPronoun($scope.formAnswers) + ' employé' + (FormService.estMasculin($scope.formAnswers) ? '' : 'e') + ' ?' :
      'Où êtes-vous employé ?';

    $scope.question = {
      model: 'milieu',
      answers: [
        {
          label: 'En milieu ordinaire',
          value: 'ordinaire'
        },
        {
          label: 'En entreprise adaptée',
          value: 'adaptee'
        },
        {
          label: 'En milieu protégé (Etablissements et services d’aide par le travail - ESAT)',
          value: 'etablissement'
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.milieu);
    };

    $scope.nextStep = function() {
      if ($scope.sectionModel.milieu.value === 'etablissement') {
        $state.go('^.emploi.nom_poste');
      } else {
        $state.go('^.type');
      }
    };
  });
