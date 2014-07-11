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
    $scope.title = 'Pour quelle personne faites-vous cette demande ?';

    $scope.question = {
      'model': 'estRepresentant',
      'answers': [
        {'label': 'Pour vous', 'value': false},
        {'label': 'Pour une autre en tant que représentant légal', 'value': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('form.demande.date_naissance');
    };
  });
