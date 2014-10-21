'use strict';

angular.module('impactApp')
  .controller('CmCliniqueCtrl', function ($scope) {
    if (!$scope.form.clinique) {
      $scope.form.clinique = {};
    }

    $scope.addDescription = function() {
      $scope.descriptions.push({name: '', frequence: {}});
    };

    if (!$scope.form.clinique.descriptions) {
      $scope.form.clinique.descriptions = [];
    }
    $scope.descriptions = $scope.form.clinique.descriptions;
    while($scope.descriptions.length < 3) {
      $scope.addDescription();
    }
    
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
