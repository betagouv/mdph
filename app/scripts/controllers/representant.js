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
    $scope.question = {
      'title' : 'Pour quelle personne faites vous cette demande ?',
      'answers' : [
        {'label' : 'Pour vous', 'value' : false},
        {'label' : 'Pour une autre en tant que représentant légal', 'value' : true}
      ]
    };

    $scope.isNextStepDisabled = function() {
      return $scope.question.model === undefined;
    };

    $scope.nextStep = function() {
      $scope.data.estRepresentant = $scope.question.model;
      $state.go('form.date_naissance');
    };
  });
