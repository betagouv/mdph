'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:ScolaireCtrl
 * @description
 * # ScolaireCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('ScolaireCtrl', function ($scope, $sessionStorage) {

    $scope.currentSection = $sessionStorage.sectionScolarite;
    $scope.title = $scope.estRepresentant() ? 'Sa scolarité' : 'Votre scolarité';


    if (angular.isUndefined($scope.formAnswers.scolaire)) {
      $scope.formAnswers.scolaire = {
        sectionLabel: $scope.title,
        answers: {}
      };
    }

    if (angular.isUndefined($scope.$storage.sectionSituationScolaire)) {
      $scope.$storage.sectionSituationScolaire = {
        id: 0,
        sref: 'form.votre_scolarite.situation.condition',
        filter: '**.situation.**',
        span: '1',
        label: 'Votre situation',
        labelRep: 'Sa situation',
        isEnabled: true,
        showAfter: true
      };
      $scope.$storage.sectionAttentesScolaire = {
        id: 1,
        sref: 'form.votre_scolarite.vos_attentes.structure',
        filter: '**.vos_attentes.**',
        span: '2',
        label: 'Vos attentes',
        labelRep: 'Ses attentes',
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
