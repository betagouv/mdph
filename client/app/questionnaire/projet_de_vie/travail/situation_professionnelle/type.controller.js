'use strict';

angular.module('impactApp')
  .controller('TypeEmploiCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('travail', 'typeTravail', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.sectionModel.typeTravail === 'independant') {
        $state.go('^.emploi.nom_poste');
      } else {
        $state.go('^.employeur');
      }
    };
  });
