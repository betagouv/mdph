'use strict';

angular.module('impactApp')
  .controller('FormCtrl', function ($scope, $sessionStorage, datepickerConfig, SectionService, FormService, currentForm) {

    datepickerConfig.showWeeks = false;
    $scope.$storage = $sessionStorage;

    $scope.isAdult = function() {
      return FormService.isAdult($scope.formAnswers);
    };

    $scope.getLabel = function(answer) {
      if (FormService.estRepresentant($scope.formAnswers)) {
        if (answer.labelRep) {
          return answer.labelRep;
        }
        if (FormService.estMasculin($scope.formAnswers) && answer.labelRepMasc) {
          return answer.labelRepMasc;
        } else if (answer.labelRepFem){
          return answer.labelRepFem;
        }
      }
      return answer.label;
    };

    $scope.encode = function(json) {
      return encodeURIComponent(JSON.stringify(json));
    };

    $scope.sections = SectionService.getSections();
    $scope.goToNextSection = SectionService.goToNextSection;
    $scope.formAnswers = $scope.$storage.answers = currentForm.formAnswers;

    SectionService.refresh($scope.formAnswers);
  });
