'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ConditionTravailCtrl
 * @description
 * # ConditionTravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ConditionTravailCtrl', function($scope, $state) {

    $scope.subtitle = $scope.estRepresentant() ? 'A-t-' + $scope.getPronoun() + ' actuellement un emploi ?' : 'Avez-vous actuellement un emploi ?';

    $scope.question = {
      model: 'travail',
      answers: [
        {
          'label': 'Oui',
          'value': true
        },
        {
          'label': 'Non',
          'value': false
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.travail);
    };

    $scope.nextStep = function() {
      if ($scope.sectionModel.travail.value) {
        $state.go('^.milieu');
      } else {
        $state.go('^.^.sans_emploi.passe');
      }
    };
  });
