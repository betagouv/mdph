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
      'answers': [
        {
          'label': 'Non',
          'value': false
        },
        {
          'label': 'Oui',
          'value': true
        }
      ],
      radioModel: ($scope.subSectionModel.arretDeTravail) ? $scope.subSectionModel.arretDeTravail.value : '',
      setAnswer: function(answer) {
        $scope.subSectionModel.arretDeTravail = answer;
      }
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.subSectionModel.arretDeTravail);
    };

    $scope.nextStep = function() {
      if ($scope.subSectionModel.arretDeTravail.value === false) {
        $scope.goToNextSection($scope.currentSection);
      } else {
        $state.go('^.indemnite_journaliere');
      }
    };
  });
