'use strict';

angular.module('impactApp')
  .controller('VieFamilleCtrl', function($scope, $state, FormService, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienne', 'famille', $scope.formAnswers);
    $scope.hideBack = true;

    $scope.nextStep = function() {
      if ($scope.sectionModel[$scope.question.model] === 'etablissement') {
        $state.go('^.^.vos_besoins.quotidien');
      } else {
        $state.go('^.logement');
      }
    };
  });
