'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiAidantCtrl
 * @description
 * # EmploiAidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiAidantCtrl', function($scope, $state) {

    $scope.subtitle = 'Avez-vous un emploi ?';

    if (angular.isUndefined($scope.sectionModel.emploi)) {
      $scope.sectionModel.emploi = {};
    }

    $scope.question = {
      model: 'emploi',
      answers: [
        {
          label: 'Non',
          value: false
        },
        {
          label: 'Oui',
          value: true,
          detailUrl: 'views/partials/form_precisez_yes_no.html',
          detail: $scope.sectionModel.emploi.detail,
          detailLabel: 'Réduction d’activité liée à la prise en charge de la personne aidée'
        },
      ]
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.emploi;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.nature_aide');
    };
  });
