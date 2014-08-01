'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:IndemniteJournaliereCtrl
 * @description
 * # IndemniteJournaliereCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('IndemniteJournaliereCtrl', function($scope, $state) {

    $scope.subtitle = $scope.estRepresentant() ?
      'Touche-t-' + $scope.getPronoun() + ' des indemnités journalières ?' : 'Touchez vous des indemnités journalières ?';

    if (angular.isUndefined($scope.sectionModel.indemniteJournaliere)) {
      $scope.sectionModel.indemniteJournaliere = {};
    }

    $scope.question = {
      model: 'indemniteJournaliere',
      answers: [
        {
          label: 'Non',
          value: false
        },
        {
          label: 'Oui',
          value: true,
          detailUrl: 'views/partials/form_precisez_date.html',
          detail: $scope.sectionModel.indemniteJournaliere.detail,
          detailLabel: 'Depuis quand ?'
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.indemniteJournaliere;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.accident_de_travail');
    };
  });
