'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:EmploiHeuresCtrl
 * @description
 * # EmploiHeuresCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('EmploiHeuresCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'heures', $scope.formAnswers);

    $scope.checkNextStep = function(value) {
      return value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.adapte');
    };
  });
