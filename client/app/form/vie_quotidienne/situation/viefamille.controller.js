'use strict';

angular.module('impactApp')
  .controller('VieFamilleCtrl', function($scope, $state, FormService, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienne', 'famille', $scope.formAnswers);

    $scope.nextStep = function() {
      if ($scope.sectionModel[$scope.question.model] === 'etablissement') {
        if (FormService.estRenouvellement($scope.formAnswers)) {
          $state.go('^.fin_de_droits');
        } else {
          $scope.sections[1].isEnabled = true;
          $state.go('^.^.vos_besoins.quotidien');
        }
      } else {
        $state.go('^.logement');
      }
    };
  });
