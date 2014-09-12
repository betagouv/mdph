'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AmenagementCtrl
 * @description
 * # AmenagementCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AmenagementCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'amenagement', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.arret_de_travail');
    };
  });
