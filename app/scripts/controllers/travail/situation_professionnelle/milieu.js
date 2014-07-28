'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:MilieuCtrl
 * @description
 * # MilieuCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('MilieuCtrl', function($scope, $state) {
    $scope.subtitle = 'Milieu de l\'emploi';

    $scope.subtitle = $scope.estRepresentant() ? 'Où est-il employé ?' : 'Où êtes-vous employé ?';

    $scope.question = {
      answers: [
        {
          label: 'En entreprise adaptée',
          value: 'adaptee'
        },
        {
          label: 'En milieu ordinaire',
          value: 'ordinaire'
        },
        {
          label: 'En milieu protégé (Etablissements et services d’aide par le travail - ESAT)',
          value: 'etablissement'
        }
      ],
      radioModel: ($scope.subSectionModel.milieu) ? $scope.subSectionModel.milieu.value : '',
      setAnswer: function(answer) {
        $scope.subSectionModel.milieu = answer;
      }
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.subSectionModel.milieu);
    };

    $scope.nextStep = function() {
      $state.go('^.type');
    };
  });
