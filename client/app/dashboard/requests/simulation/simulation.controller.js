'use strict';

angular.module('impactApp')
  .controller('SimulationCtrl', function ($scope, SectionConstants, contexte, vieQuotidienne, renouvellement,
    travail, vieScolaire, aidant, DroitService, prestations, datepickerConfig, $sessionStorage) {

    $scope.sections = [SectionConstants[0], SectionConstants[2], SectionConstants[5]];

    $scope.questionsBySectionId = {
      contexte: contexte,
      vieQuotidienne: vieQuotidienne,
      renouvellement: renouvellement,
      travail: travail,
      scolaire: vieScolaire,
      aidant: aidant
    };

    $scope.hideSteps = true;

    $scope.$storage = $sessionStorage.$default({
      sectionModel: {}
    });

    $scope.sectionModel = $scope.$storage.sectionModel;

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

    $scope.computePrestations = function() {
      $scope.prestations = DroitService.compute($scope.sectionModel, prestations, true);
    };
  });
