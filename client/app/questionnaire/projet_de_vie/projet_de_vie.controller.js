'use strict';

angular.module('impactApp')
  .controller('ProjetDeVieCtrl', function ($scope, $state, datepickerConfig, QuestionService, $window, SectionConstants, isAdult) {
   $scope.isAdult = function() {
      return isAdult($scope.formAnswers.contexte);
    };
    datepickerConfig.showWeeks = false;

    $scope.sections = $scope.currentRequest.renouvellement ? SectionConstants : _.where(SectionConstants, {'renew': undefined});

    $scope.encode = function(json) {
      return encodeURIComponent(JSON.stringify(json));
    };
  });
