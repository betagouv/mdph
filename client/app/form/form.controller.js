'use strict';

angular.module('impactApp')
  .controller('FormCtrl', function ($scope, $sessionStorage, datepickerConfig, QuestionService, SectionService, FormService, currentForm) {

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

    if (currentForm === null) {
      currentForm = {
        formAnswers: $sessionStorage.formAnswers
      };
    }
    $scope.form = currentForm;
    $scope.formAnswers = currentForm.formAnswers;
    $scope.sections = SectionService.getSections($scope.form, true);
    $scope.goToNextSection = SectionService.goToNextSection;
  });
