'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:VieQuotidienneCtrl
 * @description
 * # VieQuotidienneCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('VieQuotidienneCtrl', function ($scope, $sessionStorage) {
    $scope.currentSection = $sessionStorage.sectionVieQuotidienne;
    $scope.title = $scope.estRepresentant() ? 'Sa vie quotidienne' : 'Votre vie quotidienne';

    if (angular.isUndefined($scope.$storage.vie)) {
      $scope.$storage.vie = {
        sectionLabel: $scope.title,
        answers: {}
      };
    }

    var situation = {
      id: 0,
      sref: 'form.vie_quotidienne.situation.vie_famille',
      filter: '**.situation.**',
      span: '1',
      label: 'Votre situation',
      labelRep: 'Sa situation',
      showAfter: true
    };
    var besoins = {
      id: 1,
      sref: 'form.vie_quotidienne.vos_besoins.quotidien',
      filter: '**.vos_besoins.**',
      span: '2',
      label: 'Vos besoins',
      labelRep: 'Ses besoins',
      showBefore: true,
      showAfter: true
    };
    var attentes = {
      id: 2,
      sref: 'form.vie_quotidienne.vos_attentes.type_aide',
      filter: '**.vos_attentes.**',
      span: '3',
      label: 'Vos attentes',
      labelRep: 'Ses attentes',
      showBefore: true
    };

    $scope.colClass = 'col-md-4';
    $scope.sections = [
      situation,
      besoins,
      attentes
    ];

    $scope.sectionModel = $scope.$storage.vie.answers;
  });
