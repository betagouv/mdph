'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TypeScolaireCtrl
 * @description
 * # TypeScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TypeScolaireCtrl', function($scope, $state) {

    $scope.subtitle = 'Type de scolarisation';

    $scope.subtitle = $scope.estRepresentant() ?
      'Où est-' + $scope.getPronoun() + ' scolarisé' + ($scope.estMasculin() ? '' : 'e') + ' ?' :
      'Où êtes-vous scolarisé ?';

    $scope.question = {
      answers: [
        {
          label: 'En milieu ordinaire',
          value: 'ordinaire'
        },
        {
          label: 'A domicile',
          value: 'domicile'
        },
        {
          label: 'Avec accompagnement par un établissement médico-social',
          value: 'etablissement'
        },
        {
          label: 'En temps partagé entre l’établissement médico-social et le milieu ordinaire ou domicile',
          value: 'etablissementPartiel',
        },
        {
          label: 'En formation supérieure',
          value: 'superieur',
        }
      ],
      radioModel: ($scope.sectionModel.type) ? $scope.sectionModel.type.value : '',
      setAnswer: function(answer) {
        $scope.sectionModel.type = answer;
      }
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.type);
    };

    $scope.nextStep = function() {
      if ($scope.question.radioModel !== 'domicile') {
        $state.go('^.etablissement');
      }
      else {
        $state.go('^.vos_attentes.structure');
      }
    };
  });
