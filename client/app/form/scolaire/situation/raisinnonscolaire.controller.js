'use strict';

angular.module('impactApp')
  .controller('RaisonNonScolaireCtrl', function($scope, $state, FormService) {
    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ?
      'Pourquoi n\'est-' + FormService.getPronoun($scope.formAnswers) + ' pas scolarisé' + (FormService.estMasculin($scope.formAnswers) ? '' : 'e') + ' ?' :
      'Pourquoi n\'êtes vous pas scolarisé ?';

    if (angular.isUndefined($scope.sectionModel.raison)) {
      $scope.sectionModel.raison = {};
    }

    $scope.question = {
      model: 'raison',
      answers: [
        {
          label: 'Vous êtes trop jeune',
          labelRep: FormService.getPronoun($scope.formAnswers, true) + ' est trop jeune',
          value: 'tropJeune',

          detail: $scope.sectionModel.raison.value === 'tropJeune' ? $scope.sectionModel.raison.detail : '',
          placeholder: (FormService.estRepresentant($scope.formAnswers)) ?
            'A partir de quand sera-t-' + FormService.getPronoun($scope.formAnswers) + ' scolarisé' + (FormService.estMasculin($scope.formAnswers) ? '' : 'e') + ' ?' :
            'A partir de quand serez vous scolarisé ?',
          detailUrl: 'components/detail/precisez.html'
        },
        {
          label: 'Vous ne trouvez pas solution d\'accueil en établissement scolaire, universitaire, ou médico-social',
          labelRep: FormService.getPronoun($scope.formAnswers, true) + ' ne trouve pas solution d\'accueil en établissement',
          value: 'etablissement',

          detail: $scope.sectionModel.raison.value === 'etablissement' ? $scope.sectionModel.raison.detail : '',
          detailUrl: 'components/detail/precisez_big.html'
        },
        {
          label: 'Autre',
          value: 'autre',

          detail: $scope.sectionModel.raison.value === 'autre' ? $scope.sectionModel.raison.detail : '',
          detailUrl: 'components/detail/precisez.html'
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      if (angular.isUndefined($scope.sectionModel.raison.value)) {
        return true;
      }
      if ($scope.sectionModel.raison.value !== 'etablissement' && !$scope.sectionModel.raison.detail) {
        return true;
      }
      return false;
    };

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.vos_attentes');
    };
  });
