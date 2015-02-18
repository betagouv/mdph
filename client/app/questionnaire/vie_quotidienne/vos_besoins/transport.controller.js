'use strict';

angular.module('impactApp')
  .controller('TransportCtrl', function($scope, $state, QuestionService) {

    if (angular.isUndefined($scope.sectionModel.besoinsTransports)) {
      $scope.sectionModel.besoinsTransports = {};
    }

    $scope.question = QuestionService.get('vieQuotidienne', 'besoinsTransports', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.social');
    };
  });
