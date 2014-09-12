'use strict';

angular.module('impactApp')
  .controller('VieFamilleCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienne', 'famille', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.logement');
    };
  });
