'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ArretDeTravailCtrl
 * @description
 * # ArretDeTravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ArretDeTravailCtrl', function($scope, $state) {

    $scope.subtitle = $scope.estRepresentant() ?
      'Est-' + $scope.getPronoun() + ' actuellement en arrêt de travail ?' : 'Etes-vous actuellement en arrêt de travail ?';

    $scope.question = {
      model: 'arretDeTravail',
      answers: [
        {
          'label': 'Non',
          'value': false
        },
        {
          'label': 'Oui',
          'value': true
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.arretDeTravail);
    };

    $scope.nextStep = function() {
      if ($scope.sectionModel.arretDeTravail.value === false) {
        $scope.goToNextSection($scope.currentSection);
      } else {
        $state.go('^.indemnite_journaliere');
      }
    };
  });
