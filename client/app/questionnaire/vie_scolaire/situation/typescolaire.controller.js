'use strict';

angular.module('impactApp')
  .controller('TypeScolaireCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('scolaire', 'vieScolaireType', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.sectionModel[$scope.question.model] !== 'domicile') {
        $state.go('^.etablissement');
      } else {
        $state.go('^.^.vos_attentes.structure');
      }
    };
  });
