'use strict';

angular.module('impactApp')
  .controller('AidantCtrl', function ($scope, $sessionStorage) {

    $scope.currentSection = $sessionStorage.sectionAidant;
    $scope.title = 'Cette partie s\'adresse  à(aux) l\'aidant(s) de la personne en situation de handicap';
    $scope.hideSubsections = true;

    if (angular.isUndefined($scope.formAnswers.aidant)) {
      $scope.formAnswers.aidant = {
        sectionLabel: $scope.currentSection.label,
        answers: {}
      };
    }

    if (angular.isUndefined($scope.$storage.sectionSituationAidant)) {
      $scope.$storage.sectionSituationAidant = {
        id: 0,
        sref: 'form.votre_aidant.situation',
        span: '1',
        label: 'Votre situation',
        labelRep: 'Sa situation',
        isEnabled: false,
        showAfter: true,
      };
      $scope.$storage.sectionAttentesAidant = {
        id: 1,
        sref: 'form.votre_aidant.vos_attentes',
        span: '2',
        label: 'Vos attentes',
        labelRep: 'Ses attentes',
        isEnabled: false,
        showBefore: true
      };
    }

    $scope.colClass = 'col-md-6';
    $scope.sections = [
      $scope.$storage.sectionSituationAidant,
      $scope.$storage.sectionAttentesAidant
    ];

    $scope.sectionModel = $scope.formAnswers.aidant.answers;
  });
