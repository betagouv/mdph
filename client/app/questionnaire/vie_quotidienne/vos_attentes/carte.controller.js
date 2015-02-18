'use strict';

angular.module('impactApp')
  .controller('CarteCtrl', function ($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienne', 'attentesCarte', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.autres_renseignements');
    };
  });
