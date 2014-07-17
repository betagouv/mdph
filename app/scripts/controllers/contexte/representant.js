'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:RepresentantCtrl
 * @description
 * # RepresentantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('RepresentantCtrl', function($scope, $state) {
    $scope.title = 'Représentant légal';

    $scope.question = {
      'answers': [
        {'label': 'Vous faites cette demande pour vous', 'value': false},
        {'label': 'Vous faites cette demande pour un autre en tant que représentant légal', 'value': true}
      ],
      radioModel: ($scope.sectionModel.estRepresentant) ? $scope.sectionModel.estRepresentant.value : '',
      setAnswer: function(answer) {
        $scope.sectionModel.estRepresentant = answer;
      }
    };

    $scope.isNextStepDisabled = function() {
      return angular.isUndefined($scope.sectionModel.estRepresentant);
    };
    
    $scope.nextStep = function() {
      $state.go('^.dossier');
    };
  });
