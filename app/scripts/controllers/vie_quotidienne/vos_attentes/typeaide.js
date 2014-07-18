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
    
    if (angular.isUndefined($scope.subSectionModel.typeAide)) {
      $scope.subSectionModel.typeAide = {
        attentes: {
          'humain': false,
          'materiel': false,
          'financier': false,
          'orientation_sante': false,
          'medico_social': false,
          'autre': false
        },
        detail: ''
      };
    }

    $scope.model = $scope.subSectionModel.typeAide;
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


    $scope.showDetail = function() {
      $state.go('.autre');
    };

    $scope.nextStep = function() {
      $state.go('^.structure');
    };
  });
