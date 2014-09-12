'use strict';

angular.module('impactApp')
  .controller('SocialCtrl', function($scope, $state, QuestionService) {

    if (angular.isUndefined($scope.subSectionModel.besoinsSocial)) {
      $scope.subSectionModel.besoinsSocial = {};
    }

    $scope.question = QuestionService.get('besoinsSocial', $scope.formAnswers);

    $scope.nextStep = function() {
      $state.go('^.lieu_de_vie');
    };
  });
