'use strict';

angular.module('impactApp')
  .controller('ProjetDeVieCtrl', function ($scope, datepickerConfig, QuestionService, $window, SectionService) {
    datepickerConfig.showWeeks = false;
    $scope.getLabel = QuestionService.getLabel;

    $scope.goToNextSection = SectionService.goToNextSection;
    $scope.goToFinalSection = SectionService.goToFinalSection;

    $scope.previousStep = function() {
      $window.history.back();
    };
  });
