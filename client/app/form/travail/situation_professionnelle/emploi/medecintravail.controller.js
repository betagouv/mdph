'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:MedecinTravailCtrl
 * @description
 * # MedecinTravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('MedecinTravailCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'medecinTravail', $scope.formAnswers);

    $scope.nextStep = function() {
      $scope.sections[1].isEnabled = true;
      $state.go('^.^.^.projet_professionnel.description');
    };
  });
