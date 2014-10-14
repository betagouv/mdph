'use strict';

angular.module('impactApp')
  .controller('FormCtrl', function ($scope, $sessionStorage, datepickerConfig, QuestionService, SectionService, FormService, $window) {

    datepickerConfig.showWeeks = false;
    $scope.$storage = $sessionStorage.$default({
        formAnswers: {}
    });

    $scope.getLabel = QuestionService.getLabel;

    $scope.isAdult = function() {
      return FormService.isAdult($scope.formAnswers);
    };

    $scope.encode = function(json) {
      return encodeURIComponent(JSON.stringify(json));
    };

    $scope.previousStep = function() {
      $window.history.back();
    };

    $scope.formAnswers = $scope.$storage.formAnswers;
    $scope.sections = SectionService.getSections($scope.formAnswers, true);
    $scope.goToNextSection = SectionService.goToNextSection;
  });
