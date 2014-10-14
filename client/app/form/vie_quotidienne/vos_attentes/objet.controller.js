'use strict';

angular.module('impactApp')
  .controller('ObjetCtrl', function($scope, $sessionStorage, QuestionService, SectionService) {

    if (angular.isUndefined($scope.sectionModel.objetDemande)) {
      $scope.sectionModel.objetDemande = {};
    }

    $scope.question = QuestionService.get('vieQuotidienne', 'objetDemande', $scope.formAnswers);

    $scope.nextStep = function() {
      SectionService.refresh($scope.formAnswers);
      $scope.goToNextSection($scope.currentSectionId);
    };
  });
