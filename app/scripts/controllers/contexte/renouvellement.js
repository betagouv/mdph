'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:RenouvellementCtrl
 * @description
 * # RenouvellementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('RenouvellementCtrl', function($scope, $state) {
    $scope.subtitle = 'Quelle est la raison de votre renouvellement ?';

    $scope.question = {
      model: 'changementDeSituation',
      'answers': [
        {
          'label': 'Vous arrivez à la fin de vos droits',
          'labelRep': $scope.getName() + ' arrive à la fin de ses droits',
          'value': false
        },
        {
          'label': 'Votre situation a changé',
          'labelRep': 'La situation de ' + $scope.getName() + ' a changé',
          'value': true
        }
      ]
    };

    $scope.isNextStepDisabled = function() {
      var answer = $scope.sectionModel.changementDeSituation;
      return angular.isUndefined(answer);
    };

    $scope.nextStep = function() {
      $state.go('^.code_postal');
    };
  });
