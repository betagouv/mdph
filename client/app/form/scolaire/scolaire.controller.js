'use strict';

angular.module('impactApp')
  .controller('ScolaireCtrl', function ($scope, $sessionStorage, FormService) {

    $scope.currentSection = $sessionStorage.sectionScolarite;
    $scope.title = FormService.estRepresentant($scope.formAnswers) ? 'Sa scolarité' : 'Votre scolarité';

    if (angular.isUndefined($scope.formAnswers.scolaire)) {
      $scope.formAnswers.scolaire = {
        sectionLabel: $scope.title,
        answers: {}
      };
    }

    if (angular.isUndefined($scope.$storage.sectionSituationScolaire)) {
      $scope.$storage.sectionSituationScolaire = {
        id: 0,
        sref: 'form.votre_scolarite.situation',
        span: '1',
        label: 'Votre situation',
        labelRep: 'Sa situation',
        isEnabled: true,
        showAfter: true
      };
      $scope.$storage.sectionAttentesScolaire = {
        id: 1,
        sref: 'form.votre_scolarite.vos_attentes',
        span: '2',
        label: 'Vos attentes',
        labelRep: 'Ses attentes',
        isEnabled: angular.isDefined($scope.form),
        showBefore: true
      };
    }

    $scope.colClass = 'col-md-6';
    $scope.sections = [
      $scope.$storage.sectionSituationScolaire,
      $scope.$storage.sectionAttentesScolaire
    ];

    $scope.sectionModel = $scope.formAnswers.scolaire.answers;
  });
