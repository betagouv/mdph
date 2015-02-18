'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:PoleEmploiCtrl
 * @description
 * # PoleEmploiCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('StageCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'situationStage', $scope.formAnswers);

    $scope.checkNextStep = function(value) {
      return value === '';
    };

    $scope.nextStep = function() {
      $state.go('^.^.^.projet_professionnel.description');
    };
  });
