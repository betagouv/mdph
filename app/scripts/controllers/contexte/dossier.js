'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DossierCtrl
 * @description
 * # DossierCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DossierCtrl', function($scope, $state) {
    $scope.subtitle = 'Est-ce votre premier dossier ?';

    if (angular.isUndefined($scope.sectionModel.nouveauDossier)) {
      $scope.sectionModel.nouveauDossier = {};
    }

    $scope.question = {
      model: 'nouveauDossier',
      answers: [
        {
          label: 'Oui',
          value: true
        },
        {
          label: 'Non',
          value: false
        }
      ],
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.nouveauDossier;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };


    $scope.nextStep = function() {
      var answer = $scope.sectionModel[$scope.question.model];
      if (answer.value) {
        $state.go('^.date_naissance');
      } else {
        $state.go('^.num_dossier');
      }
    };
  });
