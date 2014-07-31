'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TravailCtrl
 * @description
 * # TravailCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TravailCtrl', function ($scope, $sessionStorage) {

    $scope.title = $scope.estRepresentant() ? 'Sa vie au travail' : 'Votre vie au travail';

    $scope.currentSection = $sessionStorage.sectionTravail;

    if (angular.isUndefined($scope.$storage.travail)) {
      $scope.$storage.travail = {
        sectionLabel: 'Vie au travail',
        answers: {}
      };
    }

    var situation = {
      id: 0,
      sref: 'form.votre_travail.situation_professionnelle.condition',
      filter: '**.situation_professionnelle.**',
      span: '1',
      label: 'Votre situation professionnelle',
      labelRep: 'Sa situation professionnelle',
      isEnabled: true
    };
    var projet = {
      id: 1,
      sref: 'form.votre_travail.projet_professionnel.description',
      filter: '**.projet_professionnel.**',
      span: '2',
      label: 'Votre projet professionnel',
      labelRep: 'Ses projet professionnel',
      isEnabled: true
    };

    $scope.colClass = 'col-md-6';
    $scope.sections = [
      situation,
      projet
    ];

    $scope.travailModel = $scope.$storage.travail.answers;
  });
