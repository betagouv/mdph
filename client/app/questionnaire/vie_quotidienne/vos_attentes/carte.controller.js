'use strict';

angular.module('impactApp')
  .controller('CarteCtrl', function ($scope, $state, QuestionService) {

    if (angular.isUndefined($scope.sectionModel.attentesCarte)) {
      $scope.sectionModel.attentesCarte = {};
    }

    $scope.question = QuestionService.get('vieQuotidienne', 'attentesCarte', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.autres_renseignements');
    };
  });
