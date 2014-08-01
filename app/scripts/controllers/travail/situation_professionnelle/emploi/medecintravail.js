'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:MedecinTravailCtrl
 * @description
 * # MedecinTravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('MedecinTravailCtrl', function($scope, $state) {

    $scope.subtitle = $scope.estRepresentant() ?
      'A-t-' + $scope.getPronoun() + ' rencontré le médecin du travail en visite de pré-reprise ?' : 'Avez-vous rencontré le médecin du travail en visite de pré-reprise ?';

    if (angular.isUndefined($scope.sectionModel.medecinTravail)) {
      $scope.sectionModel.medecinTravail = {};
    }

    $scope.question = {
      model: 'medecinTravail',
      'answers': [
        {
          'label': 'Non',
          'value': false
        },
        {
          'label': 'Oui',
          'value': true,
          detailUrl: 'views/partials/form_precisez_date.html',
          detail: $scope.sectionModel.medecinTravail.detail,
          detailLabel: 'A quelle date ?'
        }
      ]
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
      var model = $scope.sectionModel.medecinTravail;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.^.projet_professionnel.description');
    };
  });
