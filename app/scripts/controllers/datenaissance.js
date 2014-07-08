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
    $scope.question = {
      'title' : $scope.data.estRepresentant ? 'Quelle est la date de naissance du demandeur ?' : 'Quelle est votre date de naissance ?',
    };

    $scope.date = new Date();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      startingDay: 1
    };

    $scope.isNextStepDisabled = function() {
      return $scope.question.model === undefined;
    };

    $scope.nextStep = function() {
      $scope.data.dateNaissance = $scope.question.model;
      $state.go('form.vie_quotidienne.vie_famille');
    };
  });
