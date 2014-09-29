'use strict';

angular.module('impactApp')
  .controller('VieQuotidienneCtrl', function ($scope, $sessionStorage, FormService) {

    $scope.currentSectionId = 1;

    $scope.title = FormService.estRepresentant($scope.formAnswers) ? 'Sa vie quotidienne' : 'Votre vie quotidienne';

    if (angular.isUndefined($scope.$storage.sectionSituationVie)) {
      $scope.$storage.sectionSituationVie = {
        id: 0,
        sref: 'form.vie_quotidienne.situation',
        span: '1',
        label: 'Votre situation',
        labelRep: 'Sa situation',
        isEnabled: true,
        showAfter: true
      };
      $scope.$storage.sectionBesoinsVie = {
        id: 1,
        sref: 'form.vie_quotidienne.vos_besoins',
        span: '2',
        label: 'Vos besoins',
        labelRep: 'Ses besoins',
        showBefore: true,
        showAfter: true
      };
      $scope.$storage.sectionAttentesVie = {
        id: 2,
        sref: 'form.vie_quotidienne.vos_attentes',
        span: '3',
        label: 'Vos attentes',
        labelRep: 'Ses attentes',
        showBefore: true
      };
    }

    $scope.colClass = 'col-md-4';
    $scope.sections = [
      $scope.$storage.sectionSituationVie,
      $scope.$storage.sectionBesoinsVie,
      $scope.$storage.sectionAttentesVie
    ];

    if (angular.isUndefined($scope.formAnswers.vieQuotidienne)) {
      $scope.formAnswers.vieQuotidienne = {};
    }

    $scope.sectionModel = $scope.formAnswers.vieQuotidienne;
  });
