'use strict';

angular.module('impactApp')
  .controller('TravailCtrl', function ($scope, RequestService) {

    $scope.title = RequestService.estRepresentant($scope.formAnswers) ? 'Sa vie au travail' : 'Votre vie au travail';

    $scope.currentSectionId = 3;

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

    if (angular.isUndefined($scope.formAnswers.travail)) {
      $scope.formAnswers.travail = {};
    }

    $scope.sectionModel = $scope.formAnswers.travail;
  });
