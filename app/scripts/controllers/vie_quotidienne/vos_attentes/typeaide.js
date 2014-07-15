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
    
    if (angular.isUndefined($scope.parentModel.typeAide)) {
      $scope.parentModel.typeAide = {
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

    $scope.model = $scope.parentModel.typeAide;
    $scope.question = {
      model: 'attentes',
      answers:
      [
        {'label': 'Une aide humaine', 'model': 'humain'},
        {'label': 'Une aide matérielle', 'model': 'materiel'},
        {'label': 'Une aide financière', 'model': 'financier'},
        {'label': 'Une orientation vers un établissement médico-social', 'model': 'orientation_sante'},
        {'label': 'Un accompagnement pas un service médico-social', 'model': 'medico_social'},
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
