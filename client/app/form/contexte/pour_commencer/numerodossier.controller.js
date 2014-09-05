'use strict';

angular.module('impactApp')
  .controller('NumDossierCtrl', function($scope, $state) {
    $scope.subtitle = 'Connaissez-vous votre numéro de dossier ?';

    if (angular.isUndefined($scope.sectionModel.numDossier)) {
      $scope.sectionModel.numDossier = {};
    }

    $scope.question = {
      model: 'numDossier',
      answers: [
        {
          label: 'Oui',
          value: true,
          detailUrl: 'components/detail/precisez.html',
          detail: $scope.sectionModel.numDossier.detail,
          detailLabel: 'Numéro'
        },
        {
          label: 'Non',
          value: false
        }
      ],
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.numDossier;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };


    $scope.nextStep = function() {
      $state.go('^.renouvellement');
    };
  });
