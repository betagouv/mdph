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
      'Est-il actuellement en arrêt de travail ?' : 'Etes-vous actuellement en arrêt de travail ?';

    $scope.question = {
      'answers': [
        {
          'label': 'Oui',
          'value': true
        },
        {
          'label': 'Non',
          'value': false
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
        $scope.goToNextSection($scope.section);
      } else {
        $state.go('^.indemnite_journaliere');
      }
    };
  });
