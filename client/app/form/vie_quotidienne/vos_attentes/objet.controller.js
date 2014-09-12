'use strict';

angular.module('impactApp')
  .controller('ObjetCtrl', function($scope, $sessionStorage, QuestionService) {

    if (angular.isUndefined($scope.sectionModel.objetDemande)) {
      $scope.sectionModel.objetDemande = {};
    }

    $scope.question = QuestionService.get('objetDemande', $scope.formAnswers);

    $scope.nextStep = function() {
      $scope.goToNextSection($scope.currentSectionId);
    };
  });
