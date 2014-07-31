'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AmenagementCtrl
 * @description
 * # AmenagementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AmenagementCtrl', function($scope, $state) {

    $scope.subtitle = $scope.estRepresentant() ?
      'Des aménagements ont-ils été réalisés sur son poste de travail ?' : 'Des aménagements ont-ils été réalisés sur votre poste de travail ?';

    if (angular.isUndefined($scope.sectionModel.amenagement)) {
      $scope.sectionModel.amenagement = {};
    }

    $scope.question = {
      model: 'amenagement',
      answers: [
        {
          label: 'Non',
          value: false
        },
        {
          label: 'Oui',
          value: true,
          detailUrl: 'views/partials/form_precisez.html',
          detail: $scope.sectionModel.amenagement.detail
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.amenagement;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.arret_de_travail');
    };
  });
