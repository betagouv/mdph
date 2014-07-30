'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:TypeAideCtrl
 * @description
 * # TypeAideCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('TypeAideCtrl', function ($scope, $state) {

    if ($scope.estRepresentant()) {
      $scope.subtitle ='Quelles sont ses attentes pour compenser son handicap ?';
    } else {
      $scope.subtitle ='Quelles sont vos attentes pour compenser votre handicap ?';
    }

    if (angular.isUndefined($scope.sectionModel.typeAide)) {
      $scope.sectionModel.typeAide = {
        attentes: {},
        detail: ''
      };
    }

    $scope.model = $scope.sectionModel.typeAide;
    $scope.question = {
      model: 'attentes',
      answers:
      [
        {'label': 'Vivre en établissement', 'model': 'etablissement'},
        {'label': 'Vivre à domicile', 'model': 'domicile'},
        {'label': 'Une aide humaine', 'model': 'humain'},
        {'label': 'Une aide financière', 'model': 'financier'},
        {'label': 'Une aide technique, du matériel ou équipement', 'model': 'materiel'},
        {'label': 'Autre besoin', 'model': 'autre', 'detail': true}
      ]
    };

    $scope.nextStep = function() {
      $state.go('^.structure');
    };
  });
