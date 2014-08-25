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
          'value': true,
          detailUrl: 'views/partials/form_precisez_date.html',
          detail: $scope.sectionModel.arretDeTravail.detail,
          detailLabel: 'Depuis quand ?'
        }
      ]
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.arretDeTravail);
    };

    $scope.nextStep = function() {
      if ($scope.sectionModel.arretDeTravail.value === false) {
        $scope.sections[1].isEnabled = true;
        $state.go('^.^.^.projet_professionnel.description');
      } else {
        $state.go('^.indemnite_journaliere');
      }
    };
  });
