'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:LieuDeVieCtrl
 * @description
 * # LieuDeVieCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('LieuDeVieCtrl', function($scope, $state) {

    if ($scope.estRepresentant()) {
      $scope.subtitle = 'Pour adapter sont lieu de vie';
    } else {
      $scope.subtitle = 'Pour adapter votre lieu de vie';
    }

    if (angular.isUndefined($scope.subSectionModel.lieuDeVie)) {
      $scope.subSectionModel.lieuDeVie = {
        'besoins': {
          'materiel': false,
          'nouveau_lieu': false,
          'amenagement': false,
          'autre': false
        },
        'detail': ''
      };
    }

    $scope.model = $scope.subSectionModel.lieuDeVie;
    $scope.question = {
      'model': 'besoins',
      'answers': [
        {
          'label': 'Vous équiper d\'un matériel spécifique',
          labelRep: 'S\'équiper d\'un matériel spécifique',
          'model': 'materiel'
        },
        {
          'label': 'Aménager votre lieu de vie',
          labelRep: 'Aménager son lieu de vie',
          'model': 'amenagement'},
        {'label': 'Autre besoin', 'model': 'autre', 'detail': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.securite');
    };
  });
