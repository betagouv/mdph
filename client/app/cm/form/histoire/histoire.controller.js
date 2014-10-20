'use strict';

angular.module('impactApp')
  .controller('CmHistoireCtrl', function ($scope) {
    $scope.valuesOrigine = [
      {
        id: 'congenitale',
        label: 'Congénitale'
      },
      {
        id: 'maladie',
        label: 'Maladie'
      },
      {
        id: 'accident_vie_privee',
        label: 'Accident vie privée'
      },
      {
        id: 'accident_travail',
        label: 'Accident du travail'
      },
      {
        id: 'maladie_professionnelle',
        label: 'Maladie professionnelle'
      }
    ];

    $scope.valuesDate = [
      {
        id: 'naissance',
        label: 'A la naissance'
      },
      {
        id: 'inferieure_un_an',
        label: 'Inférieure à un an'
      },
      {
        id: 'entre_un_cinq_ans',
        label: 'Entre 1 et 5 ans'
      },
      {
        id: 'plus_cinq_ans',
        label: 'Plus de 5 ans'
      }
    ];
  });
