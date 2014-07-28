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

    if ($scope.estRepresentant()) {
      $scope.subtitle ='Quels sont ses besoins d\'aide pour assurer sa sécurité ?';
    } else {
      $scope.subtitle ='Quels sont vos besoins d\'aide pour assurer votre sécurité ?';
    }

    if (angular.isUndefined($scope.subSectionModel.securite)) {
      $scope.subSectionModel.securite = {
        'besoins': {
          'interieur': false,
          'exterieur': false
        }
      };
    }

    $scope.model = $scope.subSectionModel.securite;
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
