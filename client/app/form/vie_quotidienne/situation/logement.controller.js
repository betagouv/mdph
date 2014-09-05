'use strict';

angular.module('impactApp')
  .controller('LogementCtrl', function($scope, $state) {
    $scope.subtitle = $scope.estRepresentant() ? 'Où loge-t-' + $scope.getPronoun() + ' ?' : 'Où logez-vous ?';

    if (angular.isUndefined($scope.sectionModel.logement)) {
      $scope.sectionModel.logement = {};
    }

    $scope.question = {
      model: 'logement',
      answers: [
        {
          label: 'En logement indépendant',
          value: 'independant', // TODO a verifier onlyAdult: true,
          detailUrl: 'components/detail/independant.html',
          detail: $scope.sectionModel.logement.value === 'independant' ? $scope.sectionModel.logement.detail : ''
        },
        {
          label: 'En établissement',
          value: 'etablissement',
          detailUrl: 'components/detail/precisez.html',
          detail: $scope.sectionModel.logement.value === 'etablissement' ? $scope.sectionModel.logement.detail : '',
          placeholder: 'Nom de l\'établissement',
          documents: [{category: 'sante', id: 'bilanAccompagnementEnfant'}]
        },
        {
          label: 'Hébergé(e) au domicile par une autre personne',
          value: 'domicile',
          detailUrl: 'components/detail/domicile.html',
          detail: $scope.sectionModel.logement.value === 'domicile' ? $scope.sectionModel.logement.detail : ''
        },
        {
          label: 'Autre',
          value: 'autre',
          detailUrl: 'components/detail/precisez.html',
          detail: $scope.sectionModel.logement.value === 'autre' ? $scope.sectionModel.logement.detail : ''
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var answer = $scope.sectionModel.logement;
      if (angular.isUndefined(answer.value)) {
        return true;
      }

      if (answer.detail === '') {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.fin_de_droits');
    };
  });
