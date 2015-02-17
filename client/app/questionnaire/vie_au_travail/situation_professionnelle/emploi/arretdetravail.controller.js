'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ArretDeTravailCtrl
 * @description
 * # ArretDeTravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ArretDeTravailCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'arretDeTravail', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.sectionModel[$scope.question.model] === false) {
        $state.go('^.^.^.projet_professionnel.description');
      } else {
        $state.go('^.indemnite_journaliere');
      }
    };
  });
