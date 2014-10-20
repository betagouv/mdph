'use strict';

angular.module('impactApp')
  .controller('CmCliniqueActuelleCtrl', function ($scope) {
    $scope.descriptions = [{name: '', frequence: {}}];
    $scope.perspectives = [
      {
        id: 'stabilite',
        label: 'Stabilité'
      },
      {
        id: 'aggravation',
        label: 'Aggravation'
      },
      {
        id: 'fluctuante',
        label: 'Incapacité fluctuante'
      },
      {
        id: 'evolutivite',
        label: 'Evolutivité majeure'
      },
      {
        id: 'non_definie',
        label: 'Non définie',
        br: true
      },
      {
        id: 'ameliorations',
        label: 'Amélioration',
        br: true
      }
    ];
  });
