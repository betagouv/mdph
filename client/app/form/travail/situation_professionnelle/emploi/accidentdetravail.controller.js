'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AccidentDeTravailCtrl
 * @description
 * # AccidentDeTravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AccidentDeTravailCtrl', function($scope, $state, FormService) {

    $scope.subtitle = FormService.estRepresentant($scope.formAnswers) ?
      'Est-' + FormService.getPronoun($scope.formAnswers) + ' en arrêt suite à un accident du travail ou une maladie professionnelle ?' : 'Etes-vous en arrêt suite à un accident du travail ou une maladie professionnelle ?';

    if (angular.isUndefined($scope.sectionModel.accidentTravail)) {
      $scope.sectionModel.accidentTravail = {};
    }

    $scope.question = {
      model: 'accidentTravail',
      'answers': [
        {
          'label': 'Non',
          'value': false
        },
        {
          'label': 'Oui',
          'value': true,
          detailUrl: 'components/detail/precisez_date.html',
          detail: $scope.sectionModel.accidentTravail.detail,
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
      var model = $scope.sectionModel.accidentTravail;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.professionnel_social');
    };
  });
