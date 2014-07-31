'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:AidantCtrl
 * @description
 * # AidantCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('AidantCtrl', function ($scope, $sessionStorage) {

    $scope.currentSection = $sessionStorage.sectionAidant;
    $scope.title = 'Cette partie s\'adresse  à(aux) l\'aidant(s) de la personne en situation de handicap';

    if (angular.isUndefined($scope.$storage.aidant)) {
      $scope.$storage.aidant = {
        sectionLabel: $scope.currentSection.label,
        answers: {}
      };
    }

    var situation = {
      id: 0,
      sref: 'form.votre_aidant.situation.lien',
      filter: '**.situation.**',
      span: '1',
      label: 'Votre situation',
      labelRep: 'Sa situation',
      showAfter: true
    };
    var attentes = {
      id: 1,
      sref: 'form.votre_aidant.vos_attentes.structure',
      filter: '**.vos_attentes.**',
      span: '2',
      label: 'Vos attentes',
      labelRep: 'Ses attentes',
      showBefore: true
    };

    $scope.colClass = 'col-md-6';
    $scope.sections = [
      situation,
      attentes
    ];

    $scope.sectionModel = $scope.$storage.aidant.answers;
  });
