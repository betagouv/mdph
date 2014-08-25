'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DedommagementCtrl
 * @description
 * # DedommagementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DedommagementCtrl', function($scope, $state) {

    $scope.subtitle = 'Etes vous dédommagé(e) pour l’aide apportée à votre proche ?';

    if (angular.isUndefined($scope.sectionModel.dedommagement)) {
      $scope.sectionModel.dedommagement = {};
    }

    $scope.question = {
      model: 'dedommagement',
      answers: [
        {
          label: 'Non',
          value: false
        },
        {
          label: 'Oui',
          value: true,
          detailUrl: 'views/partials/form_precisez_montant.html',
          detail: $scope.sectionModel.dedommagement.detail,
          placeholder: 'Montant mensuel'
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.dedommagement;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && (angular.isUndefined(model.detail) || model.detail <= 0)) {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.accompagnement');
    };
  });
