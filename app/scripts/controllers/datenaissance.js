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

    $scope.isNextStepDisabled = function() {
      return $scope.question.model === undefined;
    };

    $scope.nextStep = function() {
      $scope.data.dateNaissance = $scope.question.model;
      $state.go('q.vie_quotidienne.logement_global');
    };
  });
