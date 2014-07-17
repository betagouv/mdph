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

    $scope.title = 'Votre scolarité';
    
    $scope.question = {
      'answers': [
        {'label': 'Vous êtes actuellement scolarisé', 'value': true},
        {'label': 'Vous n\'êtes pas scolarisé', 'value': false}
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
      $state.go('^.travail');
    };
  });