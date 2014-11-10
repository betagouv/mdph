'use strict';

angular.module('impactApp')
  .controller('ProjetDeVieCtrl', function ($scope, $state, datepickerConfig, QuestionService, $window, SectionConstants) {
    datepickerConfig.showWeeks = false;
    $scope.getLabel = QuestionService.getLabel;

    $scope.sections = $scope.formAnswers.renouvellement ? SectionConstants : _.where(SectionConstants, {'renew': undefined});
    $scope.sections[2].isOptionnal = $scope.formAnswers.renouvellement;

    $scope.previousStep = function() {
      $window.history.back();
    };

    $scope.nextSection = function (current) {
      $state.go($scope.sections[current + 1].sref);
    };
  });
