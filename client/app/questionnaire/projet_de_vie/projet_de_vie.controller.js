'use strict';

angular.module('impactApp')
  .controller('ProjetDeVieCtrl', function ($scope, $state, datepickerConfig, QuestionService, $window, SectionConstants) {
    datepickerConfig.showWeeks = false;
    $scope.getLabel = QuestionService.getLabel;

    $scope.sections = $scope.formAnswers.renouvellement ? SectionConstants : _.where(SectionConstants, {'renew': undefined});

    $scope.encode = function(json) {
      return encodeURIComponent(JSON.stringify(json));
    };

    $scope.previousStep = function() {
      $window.history.back();
    };
  });
