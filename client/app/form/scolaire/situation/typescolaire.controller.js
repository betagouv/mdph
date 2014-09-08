'use strict';

angular.module('impactApp')
  .controller('TypeScolaireCtrl', function($scope, $state, FormService) {

    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ?
      'Où est-' + FormService.getPronoun($scope.formAnswers) + ' scolarisé' + (FormService.estMasculin($scope.formAnswers) ? '' : 'e') + ' ?' :
      'Où êtes-vous scolarisé ?';

    if (angular.isUndefined($scope.sectionModel.type)) {
      $scope.sectionModel.type = {};
    }

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
          label: 'En internat',
          value: 'internat',

          detailUrl: 'components/detail/precisez_yes_no.html',
          detail: $scope.sectionModel.type.value === 'internat' ? $scope.sectionModel.type.detail : '',
          detailLabel: 'Les frais de séjours sont-ils intégralement pris en charge par l\'assurance maladie, l\'Etat ou l\'aide sociale?'
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
        },
        {
          label: 'Autre',
          value: 'autre',
          detailUrl: 'components/detail/precisez.html',
          detail: $scope.sectionModel.type.value === 'autre' ? $scope.sectionModel.type.detail : ''
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.type);
    };

    $scope.nextStep = function() {
      if ($scope.sectionModel.type.value !== 'domicile') {
        $state.go('^.etablissement');
      } else {
        $scope.sections[1].isEnabled = true;
        $state.go('^.^.vos_attentes');
      }
    };
  });
