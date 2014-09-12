'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:DescriptionProjetProCtrl
 * @description
 * # DescriptionProjetProCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('DescriptionProjetProCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'description', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.besoin_soutien');
    };
  });
