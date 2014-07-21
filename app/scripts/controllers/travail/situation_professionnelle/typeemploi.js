'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TypeEmploiCtrl
 * @description
 * # TypeEmploiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TypeEmploiCtrl', function($scope, $state) {
    $scope.subtitle = 'Type d\'emploi';
    $scope.question = {
      answers: [
        {
          label: 'CDI',
          value: 'cdi'
        },
        {
          label: 'CDD',
          value: 'cdd'
        },
        {
          label: 'Interim',
          value: 'interim'
        },
        {
          label: 'Contrat aidé',
          value: 'contrat_aide'
        },
        {
          label: 'Travailleur indépendant',
          value: 'independant'
        }
      ],
      radioModel: ($scope.subSectionModel.type) ? $scope.subSectionModel.type.value : '',
      setAnswer: function(answer) {
        $scope.subSectionModel.type = answer;
      }
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.subSectionModel.type);
    };
    
    $scope.nextStep = function() {
      $state.go('^.employeur');
    };
  });
