'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:CartesCtrl
 * @description
 * # CartesCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('CartesCtrl', function($scope, $sessionStorage, $state) {

    $scope.subtitle = $scope.estRepresentant() ?
      'Souhaite-t-' + $scope.getPronoun() + ' bénéficier d\'une de ces cartes ?' : 'Souhaitez-vous bénéficier d\'une de ces cartes ?';

    if (angular.isUndefined($scope.sectionModel.cartes)) {
      $scope.sectionModel.cartes = {
        'stationnement': false,
        'invalidite': false
      };
    }

    $scope.model = $scope.sectionModel;
    $scope.question = {
      'model': 'cartes',
      'answers': [
        {
          'label': 'Une carte de stationnement',
          'model': 'carteStationnement'
        },
        {
          'label': 'Une carte d\'invalidité',
          'model': 'carteInvalidite'
        }
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.objet');
    };
  });
