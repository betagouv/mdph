'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AccidentDeTravailCtrl
 * @description
 * # AccidentDeTravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AccidentDeTravailCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'accidentTravail', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.professionnel_social');
    };
  });
