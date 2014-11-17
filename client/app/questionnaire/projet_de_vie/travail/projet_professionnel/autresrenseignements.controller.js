'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AutresRenseignementsProjetProCtrl
 * @description
 * # AutresRenseignementsProjetProCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AutresRenseignementsProjetProCtrl', function ($scope, QuestionService) {

    $scope.question = QuestionService.get('travail', 'autresRenseignements', $scope.formAnswers);

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSectionId);
    };
  });
