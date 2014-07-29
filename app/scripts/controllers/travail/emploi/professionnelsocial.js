'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ProfessionnelSocialCtrl
 * @description
 * # ProfessionnelSocialCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ProfessionnelSocialCtrl', function($scope, $state) {

    $scope.subtitle = $scope.estRepresentant() ?
      'A-t-' + $scope.getPronoun() + ' rencontré un professionnel du service social de la CARSA ?' : 'Avez-vous rencontré un professionnel du service social de la CARSA ?';

    if (angular.isUndefined($scope.sectionModel.profesionnelSocial)) {
      $scope.sectionModel.profesionnelSocial = {};
    }

    $scope.question = {
      model: 'profesionnelSocial',
      'answers': [
        {
          'label': 'Non',
          'value': false
        },
        {
          'label': 'Oui',
          'value': true,
          detailUrl: 'views/partials/form_precisez_date.html',
          detail: $scope.sectionModel.profesionnelSocial.detail,
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
      var model = $scope.sectionModel.profesionnelSocial;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && model.detail === '') {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.medecin_travail');
    };
  });
