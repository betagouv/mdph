'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiPasseCtrl
 * @description
 * # EmploiPasseCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiPasseCtrl', function($scope, $state) {
    $scope.subtitle = $scope.estRepresentant() ?
      'A-t-il déjà travaillé ?' : 'Avez-vous déjà travaillé ?';

    if (angular.isUndefined($scope.sectionModel.passe)) {
      $scope.sectionModel.passe = {};
    }

    $scope.question = {
      model: 'passe',
      answers: [
        {
          label: 'Oui',
          value: true,
          showDetail: true,
          detail: $scope.sectionModel.passe.detail,
          detailUrl: 'views/partials/form_precisez_big.html',
          placeholder: 'Pourquoi êtes-vous actuellement sans emploi et depuis quand ?'
        },
        {
          label: 'Non',
          value: false
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.passe;
      if (angular.isUndefined(model)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };


    $scope.nextStep = function() {
      $state.go('^.pole_emploi');
    };
  });
