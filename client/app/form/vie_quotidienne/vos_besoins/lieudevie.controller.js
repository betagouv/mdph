'use strict';

angular.module('impactApp')
  .controller('LieuDeVieCtrl', function($scope, $state) {

    if ($scope.estRepresentant()) {
      $scope.subtitle ='Quels sont ses besoins d\'aide pour adapter son lieu de vie ?';
    } else {
      $scope.subtitle ='Quels sont vos besoins d\'aide pour adapter votre lieu de vie ?';
    }

    if (angular.isUndefined($scope.subSectionModel.lieuDeVie)) {
      $scope.subSectionModel.lieuDeVie = {
        'besoins': {},
        'detail': ''
      };
    }

    $scope.model = $scope.subSectionModel.lieuDeVie;
    $scope.question = {
      'model': 'besoins',
      'answers': [
        {
          'label': 'Pour vous équiper d\'un matériel spécifique',
          labelRep: 'Pour s\'équiper d\'un matériel spécifique',
          'model': 'materiel'
        },
        {
          'label': 'Pour aménager votre lieu de vie',
          labelRep: 'Pour aménager son lieu de vie',
          'model': 'amenagement'},
        {'label': 'Autre besoin', 'model': 'autre', 'detail': true}
      ]
    };

    $scope.nextStep = function() {
      $scope.sections[2].isEnabled = true;
      $state.go('^.^.vos_attentes.type_aide');
    };
  });
