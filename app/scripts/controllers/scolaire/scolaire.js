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


    if (angular.isUndefined($scope.$storage.scolaire)) {
      $scope.$storage.scolaire = {
        sectionLabel: $scope.title,
        answers: {}
      };
    }

    var situation = {
      id: 0,
      sref: 'form.votre_scolarite.situation.condition',
      filter: '**.situation.**',
      span: '1',
      label: 'Votre situation',
      labelRep: 'Sa situation',
      isEnabled: true
    };
    var attentes = {
      id: 1,
      sref: 'form.votre_scolarite.vos_attentes.structure',
      filter: '**.vos_attentes.**',
      span: '2',
      label: 'Vos attentes',
      labelRep: 'Ses attentes',
      isEnabled: true
    };

    $scope.colClass = 'col-md-6';
    $scope.sections = [
      situation,
      attentes
    ];

    $scope.sectionModel = $scope.$storage.scolaire.answers;
  });
