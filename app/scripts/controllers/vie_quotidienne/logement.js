'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:LogementCtrl
 * @description
 * # LogementCtrl
 * Controller of the impactApp
 */
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
          detailUrl: 'views/partials/details/independant.html',
          detail: $scope.sectionModel.logement.value === 'independant' ? $scope.sectionModel.logement.detail : ''
        },
        {
          label: 'En établissement',
          value: 'etablissement',
          detailUrl: 'views/partials/form_precisez.html',
          detail: $scope.sectionModel.logement.value === 'etablissement' ? $scope.sectionModel.logement.detail : '',
          placeholder: 'Nom de l\'établissement'
        },
        {
          label: 'Hébergé(e) au domicile ...',
          value: 'domicile',
          detailUrl: 'views/partials/details/domicile.html',
          detail: $scope.sectionModel.logement.value === 'domicile' ? $scope.sectionModel.logement.detail : ''
        },
        {
          label: 'Autre',
          value: 'autre',
          detailUrl: 'views/partials/form_precisez.html',
          detail: $scope.sectionModel.logement.value === 'autre' ? $scope.sectionModel.logement.detail : ''
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var answer = $scope.sectionModel.logement;
      if (angular.isUndefined(answer)) {
        return true;
      }

      if (answer.detail === '') {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.vos_besoins.quotidien');
    };
  });
