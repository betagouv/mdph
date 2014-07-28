'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AccidentDeTravailCtrl
 * @description
 * # AccidentDeTravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AccidentDeTravailCtrl', function($scope, $state) {

    var initialDetail = ($scope.subSectionModel.accidentTravail) ? $scope.subSectionModel.accidentTravail.detail : '';
    var initialRadioModel = ($scope.subSectionModel.accidentTravail) ? $scope.subSectionModel.accidentTravail.value : '';

    $scope.subtitle = $scope.estRepresentant() ?
      'Est-' + $scope.getPronoun() + ' en arrêt suite à un accident du travail ou une maladie professionnelle ?' : 'Etes-vous en arrêt suite à un accident du travail ou une maladie professionnelle ?';

    $scope.question = {
      'answers': [
        {
          'label': 'Non',
          'value': false
        },
        {
          'label': 'Oui',
          'value': true,
          showDetail: true,
          detail: initialDetail,
          detailLabel: 'Depuis quand ?'
        }
      ],
      radioModel: initialRadioModel,
      setAnswer: function(answer) {
        $scope.subSectionModel.accidentTravail = answer;
        $scope.showDetail(answer);
      }
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      startingDay: 1
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.subSectionModel.accidentTravail;
      if (angular.isUndefined(model)) {
        return true;
      }

      if (model.showDetail && model.detail === '') {
        return true;
      }

      return false;
    };

    $scope.showDetail = function(value) {
      if (value.showDetail && !$state.includes('**.autre')) {
        $state.go('.autre');
      }
    };

    if (angular.isDefined($scope.subSectionModel.accidentTravail)) {
      $scope.question.setAnswer($scope.subSectionModel.accidentTravail);
    }

    $scope.nextStep = function() {
      if ($state.includes('**.autre')) {
        $state.go('^.^.professionnel_social');
      } else {
        $state.go('^.professionnel_social');
      }
    };
  });
