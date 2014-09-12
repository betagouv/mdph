'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:MilieuCtrl
 * @description
 * # MilieuCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('MilieuCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'milieuTravail', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.sectionModel.milieuTravail === 'etablissement') {
        $state.go('^.emploi.nom_poste');
      } else {
        $state.go('^.type');
      }
    };
  });
