'use strict';

angular.module('impactApp')
  .controller('CodePostalCtrl', function($scope, $state, FormService, QuestionService, mdphs) {

    $scope.question = QuestionService.get('contexte', 'mdph', $scope.formAnswers);

    $scope.mdphs = mdphs;

    $scope.nextStep = function() {
      $state.go('^.dossier');
    };
  });
