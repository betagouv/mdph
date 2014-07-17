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
    $scope.title = 'Votre renouvellement';

    $scope.question = {
      'answers': [
        {'label': 'Vous arrivez à la fin de vos droits', 'value': false},
        {'label': 'Votre situation a changé', 'value': true}
      ],
      radioModel: ($scope.sectionModel.changementDeSituation) ? $scope.sectionModel.changementDeSituation.value : '',
      setAnswer: function(answer) {
        $scope.sectionModel.changementDeSituation = answer;
      }
    };
    
    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.changementDeSituation);
    };

    $scope.nextStep = function() {
      $state.go('^.representant');
    };
  });
