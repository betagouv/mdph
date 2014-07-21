'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiTempsCtrl
 * @description
 * # EmploiTempsCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiTempsCtrl', function($scope, $state) {

    if (angular.isUndefined($scope.subSectionModel.temps)) {
      $scope.subSectionModel.temps = {
        label: '',
        value: ''
      };
    }

    $scope.question = {
      answers: [
        {
          'label': 'Temps complet',
          'value': true
        },
        {
          'label': 'Temps partiel',
          'value': false
        }
      ],
      radioModel: ($scope.subSectionModel.temps) ? $scope.subSectionModel.temps.value : '',
      setAnswer: function(answer) {
        $scope.subSectionModel.temps = answer;
      }
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.subSectionModel.temps);
    };

    $scope.nextStep = function() {
      $state.go('^.heures');
    };
  });
