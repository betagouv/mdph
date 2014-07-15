'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DateNaissanceCtrl
 * @description
 * # DateNaissanceCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DateNaissanceCtrl', function($scope, $state) {
    $scope.title = $scope.data.estRepresentant ? 'Quelle est la date de naissance du demandeur ?' : 'Quelle est votre date de naissance ?';
    
    $scope.question = {
      'model': 'dateNaissance'
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      startingDay: 1
    };

    $scope.nextStep = function() {
      $state.go('^.^.vie_quotidienne.vie_famille');
    };
  });
