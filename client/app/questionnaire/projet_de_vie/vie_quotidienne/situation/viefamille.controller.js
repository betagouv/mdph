'use strict';

angular.module('impactApp')
  .controller('VieFamilleCtrl', function($scope, $state, FormService, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienne', 'famille', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.sectionModel[$scope.question.model] === 'etablissement') {
        $scope.subsections[1].isEnabled = true;
        $state.go('^.^.vos_besoins.quotidien');
      } else {
        $state.go('^.logement');
      }
    };
  });
