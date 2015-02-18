'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AutresRenseignementsProjetProCtrl
 * @description
 * # AutresRenseignementsProjetProCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AutresRenseignementsProjetProCtrl', function ($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'autresRenseignements', $scope.formAnswers);
    $scope.isLastQuestion = true;

    $scope.nextStep = function() {
      $scope.sectionModel.__completion = true;
      $state.go('departement.questionnaire');
    };
  });
