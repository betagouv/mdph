'use strict';

angular.module('impactApp')
  .controller('ContexteCtrl', function ($sessionStorage, $scope) {

    /* Pour passer à la section suivante
    ---------------------------------------*/
    $scope.currentSection = $scope.$storage.sectionContexte;

    /* Section dans sessionStorage
    ---------------------------------------*/
    if (angular.isUndefined($scope.formAnswers.contexte)) {
      $scope.formAnswers.contexte = {
        sectionLabel: 'Contexte',
        answers: {}
      };
    }

    /* Navigation sous-etats
    ---------------------------------------*/
    if (angular.isUndefined($scope.$storage.sectionSituationContexte)) {
      $scope.$storage.sectionSituationContexte = {
        id: 0,
        sref: 'form.contexte.pour_commencer',
        span: '1',
        label: 'Pour commencer',
        isEnabled: true,
        showAfter: true
      };
      $scope.$storage.sectionUrgenceContexte = {
        id: 1,
        sref: 'form.contexte.situations',
        span: '2',
        label: 'Situations particulières',
        isEnabled: angular.isDefined($scope.form),
        showBefore: true
      };
    }

    $scope.colClass = 'col-md-6';
    $scope.sections = [
      $scope.$storage.sectionSituationContexte,
      $scope.$storage.sectionUrgenceContexte
    ];

    /* Modele des questions
    ---------------------------------------*/
    $scope.sectionModel = $scope.formAnswers.contexte.answers;
  });
