'use strict';

angular.module('impactApp')
  .controller('SimulationCtrl', function ($scope, $http, SectionConstants, contexte, vieQuotidienne, renouvellement,
    travail, vieScolaire, aidant, DroitService, prestations, datepickerConfig, $sessionStorage, $timeout, $window) {

    $scope.sections = [SectionConstants[0], SectionConstants[2], SectionConstants[4], SectionConstants[5]];

    $scope.questionsBySectionId = {
      contexte: contexte,
      vieQuotidienne: vieQuotidienne,
      renouvellement: renouvellement,
      travail: travail,
      scolaire: vieScolaire,
      aidant: aidant
    };

    $scope.hideSteps = true;
    $scope.hideTitle = true;

    $scope.$storage = $sessionStorage.$default({
      formAnswers: {}
    });

    $scope.formAnswers = $scope.$storage.formAnswers;

    datepickerConfig.datepickerMode = 'year';
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.getTemplate = function(question) {
      switch (question.type) {
        case 'radio':
          return 'components/question/radio.html';
        case 'checkbox':
          return 'components/question/checkbox.html';
        case 'date':
          return 'components/question/date_naissance.html';
      }
      return '';
    };

    $scope.submit = function() {
      $scope.prestations = DroitService.compute($scope.formAnswers, prestations);
    };

    $scope.createTest = function () {
      var keywords =  _.pluck($scope.prestations, 'id');
      var expectedResults = _.map(keywords, function(keyword) {
        return {
          code: keyword,
          expectedValue: true
        };
      });

      $http.post('http://localhost:5000/api/public/acceptance-tests', {
        keywords:  keywords,
        expectedResults: expectedResults,
        scenario: $scope.formAnswers
      }).success(function(data) {
        $window.open('http://localhost:5000/' + data._id + '/edit');
      }).error(function(data) {
        $window.alert(data);
      });
    };

    $timeout(function() {
      $scope.showPagemenu = true;
    }, 0, false);
  });
