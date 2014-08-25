'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ContexteCtrl
 * @description
 * # ContexteCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ContexteCtrl', function ($sessionStorage, $scope) {

    $scope.currentSection = $scope.$storage.sectionContexte;

    if (angular.isUndefined($scope.formAnswers.contexte)) {
      $scope.formAnswers.contexte = {
        sectionLabel: 'Contexte',
        answers: {}
      };
    }

    if (angular.isUndefined($scope.$storage.sectionSituationContexte)) {
      $scope.$storage.sectionSituationContexte = {
        id: 0,
        sref: 'form.contexte.pour_commencer.representant',
        filter: '**.pour_commencer.**',
        span: '1',
        label: 'Pour commencer',
        isEnabled: true,
        showAfter: true
      };
      $scope.$storage.sectionUrgenceContexte = {
        id: 1,
        sref: 'form.contexte.situations_urgentes.urgences',
        filter: '**.urgences.**',
        span: '2',
        label: 'Situations particulières',
        showBefore: true
      };
    }

    $scope.colClass = 'col-md-6';
    $scope.sections = [
      $scope.$storage.sectionSituationContexte,
      $scope.$storage.sectionUrgenceContexte
    ];

    $scope.sectionModel = $scope.formAnswers.contexte.answers;
  });
