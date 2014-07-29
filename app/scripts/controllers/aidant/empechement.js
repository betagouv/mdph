'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmpechementCtrl
 * @description
 * # EmpechementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmpechementCtrl', function($scope, $state) {

    $scope.subtitle = 'En cas d\'empêchement, avez-vous prévu une solution pour vous remplacer ?';

    if (angular.isUndefined($scope.sectionModel.empechement)) {
      $scope.sectionModel.empechement = {};
    }

    $scope.question = {
      model: 'empechement',
      answers: [
        {
          label: 'Non',
          value: false
        },
        {
          label: 'Oui',
          value: true,
          detailUrl: 'views/partials/form_precisez.html',
          detail: $scope.sectionModel.empechement.detail,
          placeholder: 'Laquelle'
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var model = $scope.sectionModel.empechement;
      if (angular.isUndefined(model.value)) {
        return true;
      }

      if (model.detailUrl && !model.detail) {
        return true;
      }

      return false;
    };

    $scope.nextStep = function() {
      $state.go('^.situation_future');
    };
  });
