'use strict';

angular.module('impactApp')
  .controller('QuestionnaireCtrl', function ($scope, datepickerConfig, SectionConstants, isAdult, request) {
    $scope.currentRequest = request;
    $scope.formAnswers = $scope.currentRequest.formAnswers;

    $scope.sectionsOptionnelles = _.filter(SectionConstants, {optional: true});
    $scope.sectionsObligatoires = _.filter(SectionConstants, {optional: false});

    $scope.isAdult = function() {
      return isAdult($scope.formAnswers.contexte);
    };

    datepickerConfig.showWeeks = false;

    $scope.getCompletion = function(section) {
      if (typeof $scope.formAnswers[section] === 'undefined') {
        return 0;
      }

      return 50;
    };
  });
