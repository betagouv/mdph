'use strict';

/**
 * @ngdoc function
 * @name impactApp.controller:SecuriteCtrl
 * @description
 * # SecuriteCtrl
 * Controller of the impactApp
 */
angular.module('impactApp')
  .controller('SecuriteCtrl', function($scope, $state) {

    $scope.subtitle = 'Besoin d\'aide pour assurer votre sécurité';

    if (angular.isUndefined($scope.parentModel.securite)) {
      $scope.parentModel.securite = {
        'besoins': {
          'interieur': false,
          'exterieur': false
        }
      };
    }

    $scope.model = $scope.parentModel.securite;
    $scope.question = {
      'model': 'besoins',
      'answers': [
        {'label': 'A l\'intérieur du lieu de vie', 'model': 'interieur'},
        {'label': 'En dehors du lieu de vie', 'model': 'exterieur'}
      ]
    };

    $scope.showDetail = function() {};

    $scope.nextStep = function() {
      $state.go('^.^.vos_attentes.type_aide');
    };
  });
