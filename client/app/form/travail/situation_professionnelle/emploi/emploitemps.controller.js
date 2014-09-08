'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiTempsCtrl
 * @description
 * # EmploiTempsCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiTempsCtrl', function($scope, $state, FormService) {

    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ? 'Son emploi est-il a temps complet ou partiel ?' : 'Votre emploi est-il a temps complet ou partiel ?';

    if (angular.isUndefined($scope.sectionModel.temps)) {
      $scope.sectionModel.temps = {};
    }

    $scope.question = {
      model: 'temps',
      answers: [
        {
          'label': 'Temps complet',
          'value': true
        },
        {
          'label': 'Temps partiel',
          'value': false
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.temps);
    };

    $scope.nextStep = function() {
      if ($scope.sectionModel.temps.value) {
        $state.go('^.adapte');
      } else {
        $state.go('^.heures');
      }
    };
  });
