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
    $scope.questionTitle = $scope.data.estRepresentant ? 
      'Quelle est la date de naissance du demandeur ?' :
      'Quelle est votre date de naissance ?';

    $scope.nextStep = function() {
      $state.go('q.vie_quotidienne.logement_global');
    };
  });
