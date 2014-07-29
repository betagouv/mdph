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

    $scope.subtitle = $scope.estRepresentant() ?
      'Où est-' + $scope.getPronoun() + ' scolarisé' + ($scope.estMasculin() ? '' : 'e') + ' ?' :
      'Où êtes-vous scolarisé ?';

    $scope.sectionModel = $scope.sectionModel;

    $scope.question = {
      model: 'type',
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
      ]
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.type.value);
    };

    $scope.nextStep = function() {
      if ($scope.sectionModel.type.value !== 'domicile') {
        $state.go('^.etablissement');
      } else {
        $state.go('^.vos_attentes.structure');
      }
    };
  });
