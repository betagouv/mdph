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
    $scope.subtitle = $scope.estRepresentant() ?
      'Où est-' + $scope.getPronoun() + ' employé' + ($scope.estMasculin() ? '' : 'e') + ' ?' :
      'Où êtes-vous employé ?';

    $scope.question = {
      model: 'milieu',
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
      ]
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.milieu);
    };

    $scope.nextStep = function() {
      $state.go('^.type');
    };
  });
