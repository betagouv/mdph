'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ConditionScolaireCtrl
 * @description
 * # ConditionScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ConditionScolaireCtrl', function($scope, $state) {

    $scope.subtitle = 'Situation';
    
    $scope.question = {
      'answers': [
        {
          'label': 'Vous êtes scolarisé',
          'labelRep': 'Il est scolarisé',
          'value': true
        },
        {
          'label': 'Vous n\'êtes pas scolarisé',
          'labelRep': 'Il n\'est pas actuellement scolarisé',
          'value': false
        }
      ],
      radioModel: ($scope.sectionModel.scolaire) ? $scope.sectionModel.scolaire.value : '',
      setAnswer: function(answer) {
        $scope.sectionModel.scolaire = answer;
      }
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.scolaire);
    };
    
    $scope.nextStep = function() {
      if ($scope.question.radioModel) {
        $state.go('^.type_scolaire');
      } else {
        $state.go('^.raison_non_scolaire');
      }
    };
  });