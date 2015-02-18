'use strict';

angular.module('impactApp')
  .controller('TransportCtrl', function($scope, $state, QuestionService) {

    $scope.question = QuestionService.get('vieQuotidienne', 'besoinsTransports', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.social');
    };
  });
