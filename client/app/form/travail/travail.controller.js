'use strict';

angular.module('impactApp')
  .controller('TravailCtrl', function ($scope) {

    $scope.title = $scope.estRepresentant() ? 'Sa vie au travail' : 'Votre vie au travail';

    $scope.currentSection = $scope.$storage.sectionTravail;

    if (angular.isUndefined($scope.formAnswers.travail)) {
      $scope.formAnswers.travail = {
        sectionLabel: 'Vie au travail',
        answers: {}
      };
    }

    if (angular.isUndefined($scope.$storage.sectionSituationTravail)) {
      $scope.$storage.sectionSituationTravail = {
        id: 0,
        sref: 'form.votre_travail.situation_professionnelle',
        span: '1',
        label: 'Votre situation professionnelle',
        labelRep: 'Sa situation professionnelle',
        isEnabled: true,
        showAfter: true
      };
      $scope.$storage.sectionProjetTravail = {
        id: 1,
        sref: 'form.votre_travail.projet_professionnel',
        span: '2',
        label: 'Votre projet professionnel',
        labelRep: 'Ses projet professionnel',
        showBefore: true
      };
    }

    $scope.colClass = 'col-md-6';
    $scope.sections = [
      $scope.$storage.sectionSituationTravail,
      $scope.$storage.sectionProjetTravail
    ];

    $scope.sectionModel = $scope.formAnswers.travail.answers;
  });
